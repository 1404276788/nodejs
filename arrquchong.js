let a = [1, 2, 3, 3, 2, 4];
const arr = [...new Set(a)];
console.log(arr);

$('#result').append(`
         There are <b>${basket.count}</b> items
          in your basket, <em>${basket.onSale}</em>
         are on sale!
       `);

$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`);

$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());

var x = 1;
var y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

var obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// 3


function fn() {
    return "Hello World";
  }
  
  `foo ${fn()} bar`
  // foo Hello World bar