//Idea for new app -> Forex converter
//Idea for app -> company valuation based on DCF -> pull financial data from API to calculate


//Listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e){
  //hide results
  document.getElementById('results').style.display = 'none';
  //show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

//calculate results function

function calculateResults(e){
  console.log('Calculating');
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const timeHorizon = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  
  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(timeHorizon.value) * 12;
  //compute monthly payment

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle*x*calculatedInterest) / (x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principle).toFixed();
    //show result
    document.getElementById('results').style.display = 'block';
    //hide loader
    document.getElementById('loading').style.display = 'none';

    
  }else{
    showError('Please check your numbers');
  }

//Show error function
function showError(error){
  //Create a div
  const errorDiv = document.createElement('div');
  
  //get elements to insert before
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //add bootstrap error class
  errorDiv.className = 'alert alert-danger';
  //Create text node & append to div
  errorDiv.appendChild(document.createTextNode(error));

  //insert error above heading
  card.insertBefore(errorDiv,heading);
  
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
  //clear error after 3s 
  setTimeout(clearError,3000);
  
}

}

//Clear error
function clearError(){
  document.querySelector('.alert').remove();
}