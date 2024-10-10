import { randomConcat, getSolve, getValue } from './helper';

class View {
  #data;
  #cardsContainer = document.querySelector('.cards');
  #cards = Array.from(document.querySelectorAll('.card'));
  #cardsFace = document.querySelectorAll('.card__face');
  #timerNum = document.querySelector('.timer__number');
  #curScoreEle = document.querySelector('.cur__score');
  #bestScoreEle = document.querySelector('.best__score');
  #bestTimeEle = document.querySelector('.best__timer');
  #btnPlay = document.querySelector('.play__again');

  #play = false;
  #currentCards = [];
  #currentCardsCount;
  #curScore = 0;
  #bestScore;
  #sec = 0;
  #bestTime;

  constructor() {
    this.#addHandlerCardClick();
  }

  render(equ, solve) {
    this.#data = randomConcat(equ, solve);
    this.#generateVlueMarkup();
  }

  #resetCurScoreAndTime() {
    this.#curScore = 0;
    this.#curScoreEle.textContent = 0;
    this.#timerNum.textContent = 0;
  }

  #getValue(index) {
    return this.#currentCards[index].querySelector('.card__face').textContent;
  }

  addHandlerPlayClick(handler) {
    this.#btnPlay.addEventListener('click', e => {
      e.preventDefault();
      this.#resetCurScoreAndTime();
      const fliped = this.#cards.some(card =>
        card.classList.contains('card__flip')
      );
      if (!fliped) {
        this.#play = true;
        this.#cards.forEach(card => {
          card.classList.add('card__flip');
          card.dataset.state = false;
        });
        handler();
      }
      if (fliped) {
        this.#play = false;
        this.#cards.forEach(card => {
          card.classList.remove('card__flip');
        });
      }
      const timer = setInterval(_ => {
        if (this.#play) {
          this.#sec++;
          this.#timerNum.textContent = `${this.#sec}s`;
        } else {
          this.#sec = 0;
          clearInterval(timer);
        }
      }, 1000);
    });
  }

  #addHandlerCardClick() {
    this.#cardsContainer.addEventListener('click', e => {
      const card = e.target.closest('.card');

      if (!card || !this.#play || card.dataset.state === 'true') return;
      if (this.#currentCardsCount === 2) this.#currentCards.splice(0, 2);

      // flip the card and adding it to current cards
      this.#onCardClick(card);
      console.log(this.#currentCardsCount, this.#currentCards);

      if (this.#currentCardsCount === 2) {
        const solve1 = getSolve(this.#getValue(0));
        const solve2 = getSolve(this.#getValue(1));
        console.log(solve1, solve2);

        // checking the solve of clicked cards
        this.#checkCardsSolve(solve1, solve2);

        // set current score and the right mark
        this.#curScoreEle.textContent = this.#curScore;
        this.#currentCards.forEach(
          card => (card.querySelector('.card__mark').textContent = '✔')
        );

        //setting best score and best time
        this.#setBestScoreAndTime();
      }
    });
  }

  #generateVlueMarkup() {
    this.#cardsFace.forEach((face, i) => {
      face.textContent = this.#data[i];
    });
  }

  #onCardClick(card) {
    card.querySelector('.card__mark').textContent = '?';
    card.classList.remove('card__flip');
    this.#currentCards.push(card);
    this.#currentCardsCount = this.#currentCards.length;
  }

  #checkSolve(solve1, solve2) {
    return solve1 !== solve2 || this.#currentCards[0] === this.#currentCards[1];
  }

  #wrongCard(card) {
    card.classList.add('card__flip');
    card.querySelector('.card__face').classList.add('card__wrong');
    setTimeout(_ => {
      card.querySelector('.card__face').classList.remove('card__wrong');
    }, 1000);
  }

  #checkCardsSolve(solve1, solve2) {
    if (this.#checkSolve(solve1, solve2)) {
      this.#curScore -= 5;
      this.#currentCards.forEach(card => this.#wrongCard(card));
    } else {
      this.#curScore += 10;
      this.#currentCards.forEach(card => (card.dataset.state = true));
    }
  }

  #setBestScoreAndTime() {
    if (this.#cards.every(card => card.dataset.state === 'true')) {
      this.#play = false;

      this.#bestScore = parseInt(this.#bestScoreEle.textContent);
      if (isNaN(this.#bestScore)) {
        this.#bestScore = this.#curScore;
        this.#bestTime = this.#sec;
      }
      if (this.#curScore > this.#bestScore) {
        this.#bestScore = this.#curScore;
        this.#bestTime = this.#sec;
      }
      if (this.#curScore === this.#bestScore) {
        this.#bestTime > this.#sec ? '' : (this.#bestTime = this.#sec);
      }
      this.#sec = 0;
      this.#bestTimeEle.textContent = `${this.#bestTime}s`;
      this.#bestScoreEle.textContent = this.#bestScore;
    }
  }
}
export default new View();
