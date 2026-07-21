import os
import glob
import json
import re
import hashlib
import zipfile
import xml.etree.ElementTree as ET

HARDCODED_ANSWERS_FILE = {
    "carousel_puzzle.md": "13 riders",
    "clock_problem.md": "6:24 am",
    "josephus_problem.md": "73",
    "factorial_sum_puzzle.md": "3 (Since 5! and above end in 0)",
    "train_tunnel_puzzle.md": "Train is 2 times faster than the man",
    "weighing_machine_problem.md": "Baby weighs 25 pounds"
}

HARDCODED_ANSWERS_QUESTION = {
    "Using seven 7's to get the answer as 100": "100",
    "Using 5 zeroes to get the answer as 120": "120",
    "Prove that 62 - 63 = 1": "Move the 6 upward to make it an exponent (2^6)",
    "You have 10 boxes of balls": "Subtract the actual scale reading from 550 to get the defective box number.",
    "Postman Pat delivers the mail": "Houses 2 and 8 (Depends on the full steps)",
    "Using five 9 make it 1000": "999 + (9 / 9) = 1000",
    "Using five 5 have to make 37": "(5! + 5! - 55) / 5 = 37",
    "Using four 7 you have to make 100": "77 / .77 = 100",
    "By Using seven 7 can you get 98": "(77 + 7 + 7 + 7) * (7 / 7) = 98",
    "Using eight 8 you have to make 1000": "888 + 88 + 8 + 8 + 8 = 1000",
    "2 fathers and 2 sons go fishing": "There are only 3 people: A grandfather, a father, and a son."
}

def generate_hint(answer, explanation):
    answer_str = str(answer).strip()
    if not answer_str or answer_str.lower() == "none" or "see explanation" in answer_str.lower():
        if explanation and len(explanation) > 10:
            words = explanation.split()
            if len(words) > 5:
                return " ".join(words[:5]) + "..."
        return "Think carefully about the wording or look for a pattern."
        
    if len(answer_str) < 20:
        if any(char.isdigit() for char in answer_str):
            return "The answer contains numbers/math."
        else:
            return f"The answer is {len(answer_str)} characters long and starts with '{answer_str[0]}'."
    
    return "Try reading the problem statement one more time."

def get_docx_text(path):
    try:
        doc = zipfile.ZipFile(path)
        xml_content = doc.read('word/document.xml')
        doc.close()
        tree = ET.XML(xml_content)
        paragraphs = []
        for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
            texts = [n.text for n in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if n.text]
            if texts:
                paragraphs.append(''.join(texts))
        return '\n'.join(paragraphs)
    except:
        return ""

def determine_category(q_text):
    q = q_text.lower()
    if any(x in q for x in ['clock', 'time is', 'calendar', 'day before yesterday', 'birthday', 'days from now', 'chime', 'minute']):
        return "Clock & Calendar Puzzles"
    if any(x in q for x in ['age', 'old as', 'father is currently']):
        return "Age Puzzles"
    if any(x in q for x in ['speed', 'train', 'tunnel', 'distance', 'km/hr', 'walk', 'running']):
        return "Speed, Distance & Time"
    if any(x in q for x in ['probability', 'statistics', 'random', 'bag contains', 'socks', 'drawer']):
        return "Probability & Statistics"
    if any(x in q for x in ['average', 'work', 'pipe', 'fill a tank', 'workers', 'score']):
        return "Averages & Work"
    if any(x in q for x in ['weighing', 'weight', 'pound', 'lb', 'kg', 'scale']):
        return "Weight & Ratio Puzzles"
    if any(x in q for x in ['series', 'pattern', 'next number', 'look-and-say', 'missing term']):
        return "Number Series & Patterns"
    if any(x in q for x in ['code', 'written as', 'decode', 'alphabet']):
        return "Coding & Decoding"
    if any(x in q for x in ['digit', 'make 100', 'using', 'four 4', 'five 9', 'sum of the digits', 'reversed']):
        return "Number & Digit Puzzles"
    if any(x in q for x in ['square', 'triangle', 'dots', 'lines', 'chess board', 'cube', 'geometry']):
        return "Geometry & Spatial"
    if any(x in q for x in ['switch', 'bulb', 'jar', 'label', 'river', 'boat', 'counterfeit', 'coin', 'truth', 'liar', 'josephus', 'circle', 'survive']):
        return "Classic Logic Puzzles"
    if any(x in q for x in ['belong', 'name', 'use it more', 'hole', 'sponge', 'coffin', 'moon', 'branches']):
        return "Lateral Thinking Riddles"
    return "Classic Logic Puzzles"

def apply_hardcoded_answer(question):
    for key, val in HARDCODED_ANSWERS_QUESTION.items():
        if key.lower() in question.lower():
            return val
    return "See explanation"

def parse_markdown_files(directory):
    puzzles = []
    
    # 1. Parse puzzle_X_explanations.md
    explanation_files = glob.glob(os.path.join(directory, "puzzle_*_explanations.md"))
    for fpath in explanation_files:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
            blocks = re.split(r'(?:\n### \d+\.\s+)|(?:\n\*\*\d+\.\s+)', content)
            for block in blocks[1:]:
                lines = block.strip().split('\n')
                if not lines: continue
                question = lines[0]
                if '**' in question:
                    question = question.split('**')[0].strip()
                    
                answer, explanation = "", ""
                ans_match = re.search(r'\*\*(?:Provided )?Answer:\*\*(.*?)(?:\n\*\*|\n---|$)', block, re.IGNORECASE | re.DOTALL)
                exp_match = re.search(r'\*\*Explanation:\*\*(.*?)(?:\n---|\n###|\n\*\*|$)', block, re.IGNORECASE | re.DOTALL)
                
                if exp_match:
                    explanation = exp_match.group(1).strip()
                    
                if ans_match:
                    answer = ans_match.group(1).strip()
                    if answer.startswith("Check:**"):
                        answer = answer.split('\n')[0].replace("Check:**", "").strip()
                        
                # AI Fallback extraction logic
                if not answer or answer.lower() == "none" or answer == "See explanation":
                    answer = apply_hardcoded_answer(question)
                    if answer == "See explanation":
                        bolds = re.findall(r'\*\*(.*?)\*\*', explanation)
                        if bolds:
                            answer = bolds[-1]
                        
                if question and (answer != "See explanation" or explanation):
                    puzzles.append({
                        "question": question,
                        "answer": answer,
                        "explanation": explanation,
                        "source": os.path.basename(fpath)
                    })

    # 2. Parse standalone files (batting_average, etc)
    standalone_files = glob.glob(os.path.join(directory, "*.md"))
    standalone_files = [f for f in standalone_files if "puzzle_" not in os.path.basename(f) and "plan" not in f and "task" not in f and "dump" not in f and "missing" not in f]
    for fpath in standalone_files:
        basename = os.path.basename(fpath)
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
            prob_match = re.search(r'## Problem Statement\n(?:>\s*)?(.*?)\n\n', content, re.DOTALL)
            exp_match = re.search(r'##(?: Correct)? Solution\n(.*?)(?:\n## Final Answer|$)', content, re.DOTALL)
            ans_match = re.search(r'## Final Answer\n(.*?)$', content, re.DOTALL)
            
            if prob_match:
                question = prob_match.group(1).strip()
                explanation = exp_match.group(1).strip() if exp_match else ""
                
                if ans_match:
                    answer = ans_match.group(1).strip()
                elif basename in HARDCODED_ANSWERS_FILE:
                    answer = HARDCODED_ANSWERS_FILE[basename]
                else:
                    answer = apply_hardcoded_answer(question)
                    if answer == "See explanation":
                        bolds = re.findall(r'\*\*(.*?)\*\*', explanation)
                        if bolds:
                            answer = bolds[-1]
                        
                puzzles.append({
                    "question": question,
                    "answer": answer,
                    "explanation": explanation,
                    "source": basename
                })

    # 3. Parse Econ_Systems_Predicted_Puzzle_Aptitude_Paper.docx
    econ_text = get_docx_text(os.path.join(directory, 'Econ_Systems_Predicted_Puzzle_Aptitude_Paper.docx'))
    if "Answer Key & Worked Solutions" in econ_text:
        parts = econ_text.split("Answer Key & Worked Solutions")
        q_part = parts[0]
        a_part = parts[1]
        
        q_matches = re.finditer(r'Q(\d+)\.\s+(.*?)(?=Q\d+\.|\Z)', q_part, re.DOTALL)
        questions_dict = {}
        for m in q_matches:
            num = m.group(1)
            q_text = m.group(2).strip()
            if "\nSection" in q_text:
                q_text = q_text.split("\nSection")[0].strip()
            questions_dict[num] = q_text
            
        a_matches = re.finditer(r'Q(\d+)\.\s+(.*?)\nWorking:\s+(.*?)(?=Q\d+\.|\Z)', a_part, re.DOTALL)
        for m in a_matches:
            num = m.group(1)
            answer = m.group(2).strip()
            explanation = m.group(3).strip()
            
            if num in questions_dict:
                puzzles.append({
                    "question": questions_dict[num],
                    "answer": answer,
                    "explanation": explanation,
                    "source": "Econ_Systems_Paper"
                })

    # Deduplication and Categorization
    unique_puzzles = []
    seen = set()
    for p in puzzles:
        q_clean = re.sub(r'[^a-zA-Z0-9]', '', p['question'].lower())
        q_key = q_clean[:40] if len(q_clean) > 10 else q_clean
        
        if q_key not in seen and len(q_key) > 5:
            if "Blank in original text" in p['question']:
                continue
                
            seen.add(q_key)
            p['category'] = determine_category(p['question'])
            p['hint'] = generate_hint(p.get('answer', ''), p.get('explanation', ''))
            p['id'] = hashlib.md5(p['question'].encode()).hexdigest()[:8]
            
            unique_puzzles.append(p)

    return unique_puzzles

if __name__ == "__main__":
    puzzles = parse_markdown_files(".")
    output_dir = os.path.join(".", "puzzle-app", "src", "data")
    os.makedirs(output_dir, exist_ok=True)
    out_path = os.path.join(output_dir, "puzzles.json")
    with open(out_path, "w", encoding='utf-8') as f:
        json.dump(puzzles, f, indent=2, ensure_ascii=False)
    print(f"Extracted {len(puzzles)} unique puzzles to {out_path}")
