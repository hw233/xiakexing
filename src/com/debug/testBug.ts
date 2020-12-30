module rf {
    var arr = [0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 4, 4, 4];
    export function getWordCnt() {
        let len = arr.length;
        for (let i = len - 1; i >= 0; i--) {
            if (i - 1 >= 0) {
                if (arr[i] == arr[i - 1]) {
                    arr.splice(i, 1);
                }
            }
        }

        console.log(arr);
    }

    export function breakfastNumber(staple: number[], drinks: number[], x: number): number {
        let combination = 0;
        let i = 0;
        let j = 0;
    
        staple.sort((a, b)=>{return a-b});
        drinks.sort((a, b)=>{return a-b});
    
        while (i < staple.length) {
            while (j < drinks.length) {
                if (staple[i] + drinks[j] <= x) {
                    combination++;
                }
                j++
            }
            i++
        }
    
        return combination % 1000000007;
    };
}