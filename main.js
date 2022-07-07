const cards = document.querySelectorAll('.card')
let has_flipped = false
let first_card, second_card
let score = 0
let counter = 30
let gameover = false

// Flip Card
function flipCard(){

    if(this.classList.contains('flip')){
        return
    }

    this.classList.add('flip')

    if(!has_flipped){
        // First Click
        has_flipped = true
        first_card = this
    }else{
        // Second Clik
        has_flipped = false
        second_card = this
    }

    // Matching Cards
    if(second_card){
        if(first_card.dataset.framework === second_card.dataset.framework){
            first_card.removeEventListener('click', flipCard)
            second_card.removeEventListener('click', flipCard)
            first_card = null
            second_card = null
            score += 10
        }else{
            setTimeout(() => {
                first_card.classList.remove('flip')
                second_card.classList.remove('flip')
                first_card = null
                second_card = null
            }, 500)
        }
    }

}

if(!gameover){
    setInterval(() => {
        counter--
    }, 1000)
}

function animate(){
    if(!gameover){

        if(counter <= 0 || score == 60){
            gameover = true
        }

        document.querySelector('.time').innerHTML = counter
        document.querySelector('.score').innerHTML = score

        cards.forEach(card => {
            card.addEventListener('click', flipCard)
        })

        requestAnimationFrame(animate)
        
    }else{
        return
    }
}

animate()