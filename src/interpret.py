import copy

class Operations():
    def __init__(self):
        pass
    # DATA TYPES
    def toInt(self,args):
        return int(args[0])
    def toStr(self,args):
        return str(args[0])
    # ARITHMETIC
    def add(self,args):
        return args[0]+args[1]
    def subtract(self,args):
        return args[0]-args[1]
    def multiply(self,args):
        return args[0]*args[1]
    def divide(self,args):
        return args[0]//args[1]
    def modulo(self,args):
        return args[0]%args[1]
    # COMPARISON
    def equals(self,args):
        return args[0] == args[1]
    def greater(self,args):
        return args[0] > args[1]
    # AND/OR
    def compAnd(self,args):
        return args[0] and args[1]
    def compOr(self,args):
        return args[0] or args[1]
    def negation(self,args):
        return not args[0]
    # I/O
    def write(self,args):
        print(args[0])
    def ask(self,args):
        return input(args[0]).lower()
    # Live long and prosper
    def vulcan(self,args):
        print("🖖 live long and prosper, and may emotilang light your journey to greatness 🖖")

ops = Operations()
commands = {
    # Data types
    "TOINT"   :[ops.toInt,[1]],
    "TOSTR"   :[ops.toStr,[1]],
    # Arithmetic
    "ADD"     :[ops.add,[-1,1]],
    "SUBTRACT":[ops.subtract,[-1,1]],
    "MULTIPLY":[ops.multiply,[-1,1]],
    "DIVIDE"  :[ops.divide,[-1,1]],
    "MODULO"  :[ops.modulo,[-1,1]],
    # Comparison
    "EQUALS"  :[ops.equals,[-1,1]],
    "GREATER" :[ops.greater,[-1,1]],
    # AND/OR
    "AND"     :[ops.compAnd,[-1,1]],
    "OR"      :[ops.compOr,[-1,1]],
    "NOT"     :[ops.negation,[1]],
    # I/O
    "PRINT"   :[ops.write,[1]],
    "ASK"     :[ops.ask,[1]],
    # Live long and prosper
    "VULCAN"  :[ops.vulcan,[]]
}

def evaluate(exp):
    '''
    Evaluates a single expression like [1,"ADD",2]
    Doesn't handle variable assignment/control flow.
    '''
    for i in range(len(exp)):
        if exp[i] in commands.keys():
            command = commands[exp[i]]
            return command[0]([exp[j+i] for j in command[1]])
    return exp[0]

def substitute(variables,exp):
    exp = copy.deepcopy(exp)
    for i in range(len(exp)):
        if "VAR" in str(exp[i]):
            exp[i] = variables[int(exp[i].replace("VAR",""))]
    return exp

def run(lines):
    stack = []
    num_vars = 10
    variables = [0]*num_vars
    line_num = 0
    while True:
        #print("executing line",line_num,"variables",variables)
        #evaluate(substitute(variables,["PRINT","VAR0"]))
        #print(variables)

        # VARIABLE ASSIGNMENT
        if len(lines[line_num]) > 1 and lines[line_num][1] == "ASSIGN":
            var_num = int(lines[line_num][0].replace("VAR",""))
            variables[var_num] = evaluate(substitute(variables,lines[line_num][2:]))

        # FOREVER STATEMENTS
        elif len(lines[line_num]) >= 1 and lines[line_num][0] == "FOREVER":
            stack.append(line_num+1)
        
        # IF STATEMENTS
        elif len(lines[line_num]) >= 1 and lines[line_num][0] == "IF":
            statement_value = evaluate(substitute(variables,lines[line_num][1:]))
            # If it's true, add -1 to stack (for stop command later) and continue execution
            if statement_value:
                if lines[line_num+1][0] == "START":
                    stack.append(-1)
            # If it's not true, move down the lines until we react the stop command
            else:
                if lines[line_num+1][0] != "START": # if this was a one-line if statement, then we just add 1 to line_num.
                    line_num += 1
                else:
                    line_num += 1
                    num_stops = 1
                    while num_stops > 0:
                        line_num += 1
                        if len(lines[line_num]) > 0 and lines[line_num][0] == "STOP":
                            num_stops -= 1
                        if len(lines[line_num]) > 0 and lines[line_num][0] == "START":
                            num_stops += 1

        # BREAK STATEMENTS
        elif len(lines[line_num]) >= 1 and lines[line_num][0] == "BREAK":
            num_stops = 1
            while len(stack) > 1 and stack[-1] == -1:
                stack.pop(-1)
                num_stops += 1
            stack.pop(-1)
            while num_stops > 0:
                line_num += 1
                if len(lines[line_num]) > 0 and lines[line_num][0] == "STOP":
                    num_stops -= 1
                if len(lines[line_num]) > 0 and lines[line_num][0] == "START":
                    num_stops += 1
        
        # STOP (jumps)
        elif len(lines[line_num]) >= 1 and lines[line_num][0] == "STOP":
            if stack[-1] == -1:
                stack.pop(-1)
            else:
                line_num = stack[-1]
        
        else:
            evaluate(substitute(variables,lines[line_num]))

        if line_num == len(lines)-1:
            break
        line_num += 1