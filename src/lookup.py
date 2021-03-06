# -*- coding: utf-8 -*-

'''
First, we translate the emoji program into a more readable text version.
This step is not fully necessary, but it makes debugging easier.
'''

char_replaces = {
    # LETTERS
    "๐ฐ๏ธ":"a",
    "๐ฑ๏ธ":"b",
    "ยฉ๏ธ":"c",
    "โฉ๏ธ":"d",
    "๐ง":"e",
    "๐":"f",
    "โฝ๏ธ":"g",
    "โ๏ธ":"h",
    "๐ฏ๏ธ":"i",
    "๐พ":"j",
    "๐":"k",
    "๐ข":"l",
    "โ๏ธ":"m",
    "โ๏ธ":"n",
    "๐พ๏ธ":"o",
    "๐ฟ๏ธ":"p",
    "๐งถ":"q",
    "ยฎ๏ธ":"r",
    "๐ฒ":"s",
    "โ๏ธ":"t",
    "โ":"u",
    "โ๏ธ":"v",
    "ใฐ๏ธ":"w",
    "โ":"x",
    "๐น":"y",
    "โก๏ธ":"z",
    # PUNCTUATION
    "โจ":" ",
    "โ":"?",
    "โ":"!",
    "๐งฟ":".",
    "๐งจ":",",
    # NUMBERS
    "๐":"0",
    "๐":"1",
    "๐":"2",
    "๐":"3",
    "๐":"4",
    "๐":"5",
    "๐":"6",
    "๐":"7",
    "๐":"8",
    "๐":"9"
}
com_replaces = {
    # DATA TYPES
    "๐":"'",
    "โ๏ธ":"TOSTR",
    "๐งฎ":"TOINT",
    # VARIABLES
    "โ๏ธ":"ASSIGN",
    "๐ฆ":"VAR0",
    "๐บ":"VAR1",
    "โ๏ธ":"VAR2",
    "๐งช":"VAR3",
    "๐๏ธ":"VAR4",
    "๐๏ธ":"VAR5",
    "๐":"VAR6",
    "๐งด":"VAR7",
    "๐งบ":"VAR8",
    "๐ข๏ธ":"VAR9",
    # ARITHMETIC
    "โ":"ADD",
    "โ":"SUBTRACT",
    "โ๏ธ":"MULTIPLY",
    "โ":"DIVIDE",
    "๐":"MODULO",
    # COMPARISON
    "โ๏ธ":"EQUALS",
    "๐งฒ":"GREATER",
    "โ":"NOT",
    "๐ค":"AND",
    "๐":"OR",
    # I/O
    "๐ฌ":"ASK",
    "๐จ๏ธ":"PRINT",
    # CONTROL FLOW
    "๐ค":"IF",
    "โพ๏ธ":"FOREVER",
    "๐":"START",
    "๐":"STOP",
    "โ":"BREAK",

    "๐":"VULCAN"
}