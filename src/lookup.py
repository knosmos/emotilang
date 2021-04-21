# -*- coding: utf-8 -*-

'''
First, we translate the emoji program into a more readable text version.
This step is not fully necessary, but it makes debugging easier.
'''

char_replaces = {
    # LETTERS
    "🅰️":"a",
    "🅱️":"b",
    "©️":"c",
    "↩️":"d",
    "📧":"e",
    "🎏":"f",
    "⛽️":"g",
    "♓️":"h",
    "🕯️":"i",
    "🗾":"j",
    "🎋":"k",
    "👢":"l",
    "♏️":"m",
    "♑️":"n",
    "🅾️":"o",
    "🅿️":"p",
    "🧶":"q",
    "®️":"r",
    "💲":"s",
    "✝️":"t",
    "⛎":"u",
    "♈️":"v",
    "〰️":"w",
    "❎":"x",
    "💹":"y",
    "⚡️":"z",
    # PUNCTUATION
    "✨":" ",
    "❓":"?",
    "❗":"!",
    "🧿":".",
    "🧨":",",
    # NUMBERS
    "🕛":"0",
    "🕐":"1",
    "🕑":"2",
    "🕒":"3",
    "🕓":"4",
    "🕔":"5",
    "🕕":"6",
    "🕖":"7",
    "🕗":"8",
    "🕘":"9"
}
com_replaces = {
    # DATA TYPES
    "📜":"'",
    "✉️":"TOSTR",
    "🧮":"TOINT",
    # VARIABLES
    "✏️":"ASSIGN",
    "📦":"VAR0",
    "🏺":"VAR1",
    "⚗️":"VAR2",
    "🧪":"VAR3",
    "🗃️":"VAR4",
    "🛍️":"VAR5",
    # ARITHMETIC
    "➕":"ADD",
    "➖":"SUBTRACT",
    "✖️":"MULTIPLY",
    "➗":"DIVIDE",
    "🍇":"MODULO",
    # COMPARISON
    "⚖️":"EQUALS",
    "🧲":"GREATER",
    "⛔":"NOT",
    # I/O
    "💬":"ASK",
    "🖨️":"PRINT",
    # CONTROL FLOW
    "🤔":"IF",
    "♾️":"FOREVER",
    "🏁":"START",
    "🛑":"STOP",
    "✋":"BREAK"
}