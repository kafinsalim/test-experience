// first question was removeDuplicates([1,2,2,3,4,3,3,5,6,7]). then abbreviation.

// abbreviation
// abbreviate('internationalisation') -> 'i18n'
// 'i18n'
// abbreviate('green') -> 'g3n'

// rule #1, keep the '-'
// abbreviate('green-lantern') -> 'g3n-l5n' ('g11n' wrong)

// rule #2, keep the ' '
// abbreviate('green lantern') -> 'g3n l5n'

// abbreviate('green-lantern scarlet-witch') -> 'g3n-l5n s5t-w3h'


function abbreviate(string) {
    function abbrWord(word){
        if(word.includes("-") || word.includes(" ")){
             return word
        }
        
        let number = word.length-2
        let firstAlp = word.substr(0,1)
        let lastAlp = word.substr(word.length-1,1)
        return `${firstAlp}${number}${lastAlp}`
    }
    
    if(!string.includes(" ") && !string.includes("-")){
        return abbrWord(string)   
    }
    
    if(string.includes("-") && !string.includes(" ")){
        return string.split("-").map(
            w => abbrWord(w)
        ).join("-")
    }
    
    if(string.includes(" ") && !string.includes("-")){
        return string.split(" ").map(
            w => abbrWord(w)
        ).join(" ")
    }
    
    if(string.includes("-") && string.includes(" ")){
        return string.split("-").map(
                w => w.split(/ +/).map(
                    w => abbrWord(w)
                ).join(" ")
            ).join("-")
    }
}

function test(funcToTest, input, output, desc = ""){
    let funcResult = funcToTest(input)
    let funcResultStr = JSON.stringify(funcResult)
    let expectedResultStr = JSON.stringify(output)
    let testResult = funcResultStr === expectedResultStr
      console.log(`\n================================`)
    if(testResult){
      console.log(`=>test ${desc} PASS`)
    }else{
      console.log(`=>test ${desc} FAIL`)
    }
      console.log(`=>expected: ${expectedResultStr}`)
      console.log(`=>got: ${funcResultStr}`)
      console.log(`\n`)

}

// test one word simple abbreviation
test(abbreviate, "green", "g3n", "one word abbreviation")

// test rule #1.1.
test(abbreviate, 'green-lantern', "g3n-l5n", "words abbreviation with dash")

// test rule #1.2
test(abbreviate, 'green lantern', "g3n l5n", "words abbreviation with space")

// test rule #2
test(abbreviate, 'green-lantern  scarlet-witch', "g3n-l5n s5t-w3h", "words abbreviation with dash and space")
