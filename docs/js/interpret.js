class Operations{
    // DATA TYPES
    toInt(args){
        return parseInt(args[0]);
    }
    toStr(args){
        return args[0].toString();        
    }
    // ARITHMETIC
    add(args){
        return args[0]+args[1];        
    }
    subtract(args){
        return args[0]-args[1];        
    }
    multiply(args){
        return args[0]*args[1];        
    }
    divide(args){
        return Math.floor(args[0]/args[1]);
    }
    modulo(args){
        return ((args[0] % args[1]) + args[1]) % args[1];        
    }
    random(args){
        return Math.round(Math.random()*(args[1]-args[0])+args[0]);
    }
    // COMPARISON
    equals(args){
        console.log(args[0]==args[1]);
        return args[0] == args[1];        
    }
    greater(args){
        return args[0] > args[1];        
    }
    // AND/OR
    compAnd(args){
        return args[0] && args[1];
    }
    compOr(args){
        return args[0] || args[1];        
    }
    negation(args){
        return !args[0];
    }
    // I/O
    write(args){
        console.log(args[0]);
        setTimeout(function(){document.getElementById("output").innerHTML += args[0]+"\n"},0);        
    }
    ask(args){
        return prompt(args[0]).toLowerCase();
    }   
}

ops = new Operations();
commands = {
    // Data types
    "TOINT"   :[ops.toInt,[1]],
    "TOSTR"   :[ops.toStr,[1]],
    // Arithmetic
    "ADD"     :[ops.add,[-1,1]],
    "SUBTRACT":[ops.subtract,[-1,1]],
    "MULTIPLY":[ops.multiply,[-1,1]],
    "DIVIDE"  :[ops.divide,[-1,1]],
    "MODULO"  :[ops.modulo,[-1,1]],
    "RANDOM"  :[ops.random,[1,2]],
    // Comparison
    "EQUALS"  :[ops.equals,[-1,1]],
    "GREATER" :[ops.greater,[-1,1]],
    // AND/OR
    "AND"     :[ops.compAnd,[-1,1]],
    "OR"      :[ops.compOr,[-1,1]],
    "NOT"     :[ops.negation,[1]],
    // I/O
    "PRINT"   :[ops.write,[1]],
    "ASK"     :[ops.ask,[1]]
}

function evaluate(exp){
    /*
    Evaluates a single expression like [1,"ADD",2]
    Doesn't handle variable assignment/control flow.
    */
    for (let i=0; i<exp.length; i++){
        if (Object.keys(commands).includes(exp[i])){
            let command = commands[exp[i]];
            let args = [];
            for (let j of command[1]){
                args.push(exp[j+i])
            }
            return command[0](args);
        }
    }
    return exp[0];
}

function substitute(variables,exp){
    exp = JSON.parse(JSON.stringify(exp));
    for (let i=0; i<exp.length; i++){
        if (exp[i].toString().includes("VAR")){
            exp[i] = variables[parseInt(exp[i].replace("VAR",""))];
        }    
    }
    return exp;
}

function run(lines){
    let stack = [];
    let variables = [0,0,0,0,0,0,0,0,0,0];
    let line_num = 0;
    while (true){
        console.log("executing line",line_num,"stack is",stack);
        // VARIABLE ASSIGNMENT
        if (lines[line_num].length > 1 && lines[line_num][1] == "ASSIGN"){
            var_num = parseInt(lines[line_num][0].replace("VAR",""));
            variables[var_num] = evaluate(substitute(variables,lines[line_num].slice(2)));
        }
        // FOREVER STATEMENTS
        else if (lines[line_num].length >= 1 && lines[line_num][0] == "FOREVER"){
            stack.push(line_num+1)
        }
        // IF STATEMENTS
        else if (lines[line_num].length >= 1 && lines[line_num][0] == "IF"){
            statement_value = evaluate(substitute(variables,lines[line_num].slice(1)))
            // If it's true, add -1 to stack (for stop command later) and continue execution
            if (statement_value){
                if (lines[line_num+1][0] == "START"){
                    stack.push(-1);
                }
            }
            // If it's not true, move down the lines until we react the stop command
            else{
                if (lines[line_num+1][0] != "START"){ // if this was a one-line if statement, then we just add 1 to line_num.
                    line_num += 1
                }
                else{
                    line_num += 1
                    num_stops = 1
                    while (num_stops > 0){
                        line_num += 1;
                        if (lines[line_num].length > 0 && lines[line_num][0] == "STOP"){
                            num_stops -= 1;                            
                        }
                        if (lines[line_num].length > 0 && lines[line_num][0] == "START"){
                            num_stops += 1;                            
                        }
                    }
                }
            }
        }

        // BREAK STATEMENTS
        else if (lines[line_num].length >= 1 && lines[line_num][0] == "BREAK"){
            let num_stops = 1;
            while (stack.length > 1 && stack[stack.length-1] == -1){
                stack.pop(-1);
                num_stops += 1;
            }
            stack.pop(-1);
            while (num_stops > 0){
                line_num += 1;
                if (lines[line_num].length > 0 && lines[line_num][0] == "STOP"){
                    num_stops -= 1;                    
                }
                if (lines[line_num].length > 0 && lines[line_num][0] == "START"){
                    num_stops += 1;                    
                }
            }
        }
        // STOP (jumps)
        else if (lines[line_num].length >= 1 && lines[line_num][0] == "STOP"){
            if (stack[stack.length-1] == -1){
                stack.pop(-1);
            }
            else{
                line_num = stack[stack.length-1];
            }
        }
        else{
            evaluate(substitute(variables,lines[line_num]))
        }
        if (line_num == lines.length-1)
        {
            break;
        }
        line_num += 1;
    }
}