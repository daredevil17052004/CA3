fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((data)=> data.json())
    .then((parsed) =>{
        console.log(parsed)

        const suggest = document.getElementById('top');
        let po = parsed.meals[0]
        let op = po.strMeal
        suggest.innerHTML = op

        let img = document.getElementById('img')
        const imageElement = document.createElement("img");
        imageElement.src = po.strMealThumb;
        img.appendChild(imageElement);
        imageElement.style.height = '600px'
        imageElement.style.width = '50%'
        imageElement.style.borderRadius = '10px'
        imageElement.setAttribute('id','mo')

        if(window.innerWidth <= 767){
            imageElement.style.height = '200px'
        }
       
        var modal = document.getElementById("myModal");

        var btn = document.getElementById("mo");

        var span = document.getElementsByClassName("close")[0];
      
        btn.onclick = function() {
        modal.style.display = "block";
        let na = document.getElementById('name');
        let ingre = document.getElementById('ingredients')
        let recipe = document.getElementById('recipe');
        recipe.innerHTML = `<h2>Recipe</h2>${po.strInstructions}`;
        na.innerHTML = `<h2>${po.strMeal}</h2>`
        ingre.innerHTML = `<h2>Ingredients</h2>`
        for(let i = 1; i <= 20; i++){
            let ingredient = po['strIngredient' + i];
            if (ingredient) {
                ingre.innerHTML += ingredient + '<br>';
            }
        }
        }
      

        span.onclick = function() {
        modal.style.display = "none";
        }

        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        }


})


fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((d)=>d.json())
    .then((pa)=>{
        console.log(pa)})


let foodType = document.getElementById('input');
foodType.onchange = () =>{
    console.log(foodType.value) 

    function fetchMealsByCategory(category) {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    
        return fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                let extractedData = data.meals
                console.log(extractedData)  
        
                let divElement = document.getElementById('iki');

                divElement.innerHTML = '';
               
                
                for(let i = 0; i<8; i++){
                    let divs = document.createElement('div')
                    divs.setAttribute('class','food')
                    divs.setAttribute('id','op')
                    let imgs = document.createElement('img')
                    divElement.appendChild(divs)
                    divs.appendChild(imgs)
                    imgs.src = extractedData[i].strMealThumb
                    imgs.style.height = '300px'
                    imgs.style.borderRadius = '10px'
                    let nameDiv = document.createElement('div');
                    divs.appendChild(nameDiv);
                    nameDiv.innerHTML = extractedData[i].strMeal
                    nameDiv.setAttribute('id','mod')
                    divs.style.width = '200px';
                }
            });
    }
    
    switch (foodType.value) {
        case 'Beef':
        case 'Pasta':
        case 'Chicken':
        case 'Dessert':
        case 'Lamb':
        case 'Miscellaneous':
        case 'Pork':
        case 'Seafood':
        case 'Side':
        case 'Vegetarian':
        case 'Breakfast':
        case 'Goat':        
            fetchMealsByCategory(foodType.value);
            break;
    }
}







