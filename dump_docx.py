import zipfile
import xml.etree.ElementTree as ET

def dump():
    doc = zipfile.ZipFile('Econ_Systems_Predicted_Puzzle_Aptitude_Paper.docx')
    xml_content = doc.read('word/document.xml')
    doc.close()
    
    tree = ET.XML(xml_content)
    paragraphs = []
    
    for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
        texts = [n.text for n in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if n.text]
        if texts:
            paragraphs.append(''.join(texts))
            
    with open('econ_systems_dump.md', 'w', encoding='utf-8') as f:
        f.write('\n'.join(paragraphs))

if __name__ == '__main__':
    dump()
