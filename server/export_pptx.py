#!/usr/bin/env python
"""Generate a source-linked, 16:9 TUB deck from a bounded JSON payload on stdin."""
import json
import re
import sys
from io import BytesIO

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches, Pt

GREEN = RGBColor(15, 191, 62)
DARK = RGBColor(16, 20, 17)
WHITE = RGBColor(255, 255, 255)
MUTED = RGBColor(96, 105, 99)
PALE = RGBColor(242, 245, 243)
PURPLE = RGBColor(133, 52, 243)
BLUE = RGBColor(48, 148, 255)
FONT = "Mona Sans"
XML_VALID = re.compile(r"[\u0009\u000a\u000d\u0020-\ud7ff\ue000-\ufffd]")


def clean(value, limit=1200):
    text = str(value or "")
    return "".join(XML_VALID.findall(text))[:limit]


def set_background(slide, color):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = color


def textbox(slide, x, y, w, h, text, size=18, color=DARK, bold=False, font=FONT, align=None):
    shape = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    frame = shape.text_frame
    frame.clear()
    frame.word_wrap = True
    frame.margin_left = Inches(0)
    frame.margin_right = Inches(0)
    frame.margin_top = Inches(0)
    frame.margin_bottom = Inches(0)
    frame.vertical_anchor = MSO_ANCHOR.TOP
    p = frame.paragraphs[0]
    if align is not None:
        p.alignment = align
    run = p.add_run()
    run.text = clean(text)
    run.font.name = font
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    return shape


def footer(slide, index, total, dark=False):
    color = RGBColor(185, 195, 188) if dark else MUTED
    textbox(slide, 0.55, 7.13, 9.8, 0.18, "Technical Update Briefing · GitHub and GitHub Copilot", 9, color)
    textbox(slide, 11.6, 7.13, 1.15, 0.18, f"{index} / {total}", 9, color, align=PP_ALIGN.RIGHT)


def set_hyperlink(run, url):
    if url and url.startswith("https://"):
        run.hyperlink.address = url


def add_cited_summary(slide, x, y, w, h, text, evidence):
    shape = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    frame = shape.text_frame
    frame.clear()
    frame.word_wrap = True
    frame.margin_left = frame.margin_right = frame.margin_top = frame.margin_bottom = 0
    paragraph = frame.paragraphs[0]
    paragraph.space_after = Pt(0)
    evidence_by_id = {entry.get("claimId"): entry for entry in evidence}
    number_by_id = {claim_id: index + 1 for index, claim_id in enumerate(evidence_by_id)}
    marker = re.compile(r"\[\^(c-[0-9a-f]{10}(?:,c-[0-9a-f]{10})*)\]")
    last = 0
    for match in marker.finditer(text):
        if match.start() > last:
            run = paragraph.add_run()
            run.text = clean(text[last:match.start()], 600)
            run.font.name = FONT
            run.font.size = Pt(13)
            run.font.color.rgb = MUTED
        for claim_id in match.group(1).split(","):
            source = evidence_by_id.get(claim_id)
            if source:
                run = paragraph.add_run()
                run.text = f"[{number_by_id[claim_id]}]"
                run.font.name = FONT
                run.font.size = Pt(10)
                run.font.color.rgb = BLUE
                set_hyperlink(run, source.get("url"))
        last = match.end()
    if last < len(text):
        run = paragraph.add_run()
        run.text = clean(text[last:], 600)
        run.font.name = FONT
        run.font.size = Pt(13)
        run.font.color.rgb = MUTED
    return shape


def cover(prs, data, total):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_background(slide, DARK)
    textbox(slide, 0.65, 0.65, 11.5, 0.3, "GITHUB · TECHNICAL UPDATE BRIEFING", 12, GREEN, True)
    textbox(slide, 0.65, 1.65, 11.6, 1.2, clean(data["label"], 100), 34, WHITE, True)
    textbox(slide, 0.68, 3.0, 10.8, 0.7, "GitHub and GitHub Copilot", 23, RGBColor(214, 222, 216))
    textbox(slide, 0.68, 4.1, 10.8, 0.65, clean(data["rangeLabel"], 120), 17, WHITE)
    note = data.get("historyNote", "")
    if note:
        textbox(slide, 0.68, 5.0, 11.5, 0.65, clean(note, 200), 12, RGBColor(199, 205, 200))
    footer(slide, 1, total, dark=True)


def overview(prs, data, page, total):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_background(slide, WHITE)
    textbox(slide, 0.6, 0.4, 12, 0.5, "At a glance", 28, DARK, True)
    textbox(slide, 0.62, 1.0, 12, 0.35, clean(data["rangeLabel"], 120), 14, MUTED)
    counts = data["counts"]
    columns = [
        ("UPDATES", counts.get("total", 0), GREEN),
        ("HEADLINES", counts.get("headline", 0), PURPLE),
        ("NOTABLE", counts.get("notable", 0), BLUE),
        ("TITLE-ONLY", counts.get("minor", 0), MUTED),
    ]
    for i, (label, value, color) in enumerate(columns):
        x = 0.65 + i * 3.1
        tile = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(1.75), Inches(2.75), Inches(1.45))
        tile.fill.solid()
        tile.fill.fore_color.rgb = PALE
        tile.line.color.rgb = PALE
        textbox(slide, x + 0.18, 1.98, 2.4, 0.25, label, 10, color, True)
        textbox(slide, x + 0.18, 2.35, 2.4, 0.6, str(value), 30, DARK, True)
    textbox(slide, 0.68, 3.75, 11.8, 1.1,
            "Summaries appear only when their claims pass quote-grounding and source-link checks. Title-only updates are linked to their source and are not represented as claim-verified.",
            16, DARK)
    footer(slide, page, total)
    return slide


def item_slides(prs, data, start_page, total):
    items = data.get("items", [])
    for offset in range(0, len(items), 2):
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        set_background(slide, WHITE)
        textbox(slide, 0.6, 0.35, 12, 0.42, "Selected updates", 25, DARK, True)
        for slot, item in enumerate(items[offset:offset + 2]):
            y = 1.05 + slot * 2.75
            color = PURPLE if item.get("tier") == "headline" else GREEN
            textbox(slide, 0.62, y, 0.12, 1.9, " ", 10, WHITE)
            marker = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.62), Inches(y), Inches(0.07), Inches(2.28))
            marker.fill.solid()
            marker.fill.fore_color.rgb = color
            marker.line.fill.background()
            title = clean(item.get("title"), 180)
            title_shape = textbox(slide, 0.88, y, 11.6, 0.55, title, 17, DARK, True)
            source_url = item.get("sourceUrl")
            if source_url:
                for run in title_shape.text_frame.paragraphs[0].runs:
                    set_hyperlink(run, source_url)
            summary = clean(item.get("summary"), 680)
            if summary:
                add_cited_summary(slide, 0.88, y + 0.62, 11.5, 0.82, summary, item.get("evidence", []))
            else:
                textbox(slide, 0.88, y + 0.62, 11.5, 0.32, "Title only; not claim-verified.", 12, MUTED)
            citations = item.get("evidence", [])
            if citations:
                quote_line = slide.shapes.add_textbox(Inches(0.88), Inches(y + 1.55), Inches(11.5), Inches(0.75))
                tf = quote_line.text_frame
                tf.clear()
                tf.word_wrap = True
                tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
                for index, evidence in enumerate(citations[:2]):
                    paragraph = tf.paragraphs[0] if index == 0 else tf.add_paragraph()
                    paragraph.space_after = Pt(0)
                    run = paragraph.add_run()
                    number = list(dict.fromkeys(entry.get('claimId') for entry in citations)).index(evidence.get('claimId')) + 1
                    run.text = clean(f"[{number}] {evidence.get('claim', '')} “{evidence.get('quote', '')}”", 260)
                    run.font.name = FONT
                    run.font.size = Pt(9)
                    run.font.color.rgb = MUTED
                    set_hyperlink(run, evidence.get("url"))
            else:
                source_line = slide.shapes.add_textbox(Inches(0.88), Inches(y + 1.55), Inches(11.5), Inches(0.35))
                p = source_line.text_frame.paragraphs[0]
                r = p.add_run()
                r.text = clean(item.get("sourceLabel", "Source link not verified"), 160)
                r.font.name = FONT
                r.font.size = Pt(10)
                r.font.color.rgb = MUTED
                set_hyperlink(r, source_url)
        footer(slide, start_page + offset // 2, total)


def sources_slides(prs, data, start_page, total):
    sources = data.get("sources", [])
    for offset in range(0, len(sources), 10):
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        set_background(slide, WHITE)
        textbox(slide, 0.6, 0.35, 12, 0.45, "Sources and provenance", 25, DARK, True)
        for row, source in enumerate(sources[offset:offset + 10]):
            y = 1.0 + row * 0.55
            shape = slide.shapes.add_textbox(Inches(0.65), Inches(y), Inches(12), Inches(0.42))
            p = shape.text_frame.paragraphs[0]
            r = p.add_run()
            r.text = clean(f"{source.get('published', '')} · {source.get('publisher', '')} · {source.get('title', '')}", 220)
            r.font.name = FONT
            r.font.size = Pt(12)
            r.font.color.rgb = DARK
            set_hyperlink(r, source.get("url"))
        footer(slide, start_page + offset // 10, total)


def build(data):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    item_pages = (len(data.get("items", [])) + 1) // 2
    source_pages = (len(data.get("sources", [])) + 9) // 10
    total = 2 + item_pages + source_pages
    cover(prs, data, total)
    overview(prs, data, 2, total)
    item_slides(prs, data, 3, total)
    sources_slides(prs, data, 3 + item_pages, total)
    output = BytesIO()
    prs.save(output)
    return output.getvalue()


def main():
    payload = json.load(sys.stdin)
    sys.stdout.buffer.write(build(payload))


if __name__ == "__main__":
    main()
