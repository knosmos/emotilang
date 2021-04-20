import lookup
import regex

def split(em):
    return regex.findall(r'.\p{Sk}+|\X',em)

def translate(filename):
    with open(filename,"r",encoding='utf8') as f:
        lines = f.read().split("\n")
    translation = []
    for line in lines:
        if len(line.replace(" ","")) == 0:
            continue

        translated_line = []
        inside_string = False
        inside_num = False
        num = 0
        string_line = "" # strings are represented as one item, not individual chars,
                         # which requires this to be used.
        for char in split(line):
            #print("translating",char)
            if not char in [" ","\t","\n"]:
                if char == "📜":
                    if inside_string:
                        translated_line.append(string_line)
                    else:
                        string_line = ""
                    inside_string = not inside_string
                elif char == "💯":
                    if inside_num:
                        translated_line.append(num)
                    else:
                        num = 0
                    inside_num = not inside_num
                else:
                    if inside_string:
                        try:
                            string_line += lookup.char_replaces[char]
                        except:
                            string_line += char
                    elif inside_num:
                        num *= 10
                        num += int(lookup.char_replaces[char])
                    else:
                        translated_line.append(lookup.com_replaces[char])
        translation.append(translated_line)
    return translation