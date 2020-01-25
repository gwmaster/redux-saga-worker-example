import { EXAMPLE_WORKER } from './ExampleWorker.const'

function * primes() {
  var seq = numbers(2);
  var prime;

  while (true) {
    prime = seq.next().value;
    yield prime;
    seq = filter(seq, prime);
  }
}

function * numbers(start) {
  while (true) {
    yield start++;
  }
}

function * take(count, seq) {
  for (var i = 0; i < count; i++) {
    yield seq.next().value;
  }
}

function * filter(seq, prime) {
  for (var num of seq) {
    if (num % prime !== 0) {
      yield num;
    }
  }
}

let generator
let result;
function * startFindPrime (num){
  generator = take(num , primes())
}
function * findNextPrime () {
  for(let i = 0 ; i < 1000 ; i++){
    const {value , done} = generator.next();
    if(done){
      console.log(result)
      return
    }else{
      result = value
    }
  }
  delay(100)
  yield put({ type: EXAMPLE_WORKER.FIND_NEXT_PRIME_SAGA })
}