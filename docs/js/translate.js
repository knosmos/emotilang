splitter = new GraphemeSplitter();

function translateEmoji(){
    let lines = document.getElementById("code").value.split("\n");
    let translation = [];
    for (let line of lines){
        if (line.replace(" ","").length == 0){
            continue;
        }
        let translated_line = [];
        let inside_string = false;
        let inside_num = false;
        let num = 0;
        let ascii = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',./?;[]\()!@#$%^&*-+=\<>~ \t\n"`;
        let string_line = "";
        for (let char of splitter.splitGraphemes(line)){
            if (!ascii.includes(char)){
                if (char == "📜"){
                    if (inside_string){
                        translated_line.push(string_line);
                    }
                    else{
                        string_line = "";
                    }
                    inside_string = !inside_string;
                }
                else if (char == "💯"){
                    if (inside_num){
                        translated_line.push(num);                            
                    }
                    else{
                        num = 0;
                    }
                    inside_num = !inside_num;
                }
                else{
                    if (inside_string){
                        if (Object.keys(char_replaces).includes(char)){
                            string_line += char_replaces[char];                                
                        }
                        else{
                            string_line += char;            
                        }
                    }
                    else if (inside_num){
                        num *= 10;
                        num += parseInt(char_replaces[char]);                      
                    }
                    else{
                        translated_line.push(com_replaces[char]);                        
                    }                        
                }
            }
        }
        if (translated_line.length != 0){
            translation.push(translated_line);
        }
    }
    return translation;
}