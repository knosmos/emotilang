import sys

import translate
import interpret

if len(sys.argv) == 2:
    translated = translate.translate(sys.argv[1])
    # To display parsed version (for debugging), uncomment line below
    # print("\n".join(map(str,translated)))
    interpret.run(translated)
else:
    print("❌🤔📜❔❔")