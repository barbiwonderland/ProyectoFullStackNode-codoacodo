const { default: axios } = require('axios');
const hbs = require('hbs');
let dolar;
// Obtener el dólar
axios.get("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then(resultado =>
    {
        dolar = resultado.data[4].casa.venta;
        dolar = dolar.replace(/,/g, ".");
        dolar = parseFloat(dolar);
        console.log(dolar);
    })
    .catch(err => { console.log(err); });

hbs.registerHelper('dolarApeso', precio =>
{
    const total = dolar * precio;
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(total);
});
hbs.registerHelper('listado', datos =>
{
    let array = datos.split(',');
    let html = "<ul>";
    for (item of array)
    {
        html += `<li>${item}</li>`;
    }
    return `${html}</ul>`;
});