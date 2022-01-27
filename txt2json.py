

with open('words.json', 'w') as words:
    
    words.write('{"words": [')
    
    with open('five_letter_words.txt', 'r') as f:
        for line in f.readlines():
            words.write(f'"{line.rstrip()}",')
        
    words.write(']}')