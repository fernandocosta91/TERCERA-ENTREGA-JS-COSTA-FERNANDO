const prestamo = {
    monto: 0,
    cuotas: 0,
};



let historialPrestamos = [];


const montoInput = document.getElementById('monto');
const cuotasInput = document.getElementById('cuotas');
const calcularButton = document.getElementById('calcular');
const resultadoOutput = document.getElementById('resultado');
const historialList = document.getElementById('historial-list');



calcularButton.addEventListener('click', calcularMontoTotal);

function calcularMontoTotal() {
    prestamo.monto = parseFloat(montoInput.value);
    prestamo.cuotas = parseInt(cuotasInput.value);

    if (prestamo.monto && prestamo.cuotas) {
        const valorCuota = prestamo.monto / prestamo.cuotas;

        
        if (prestamo.cuotas < 12) {
            resultadoOutput.textContent = "Cuota mensual alta";

        } else {
            resultadoOutput.textContent = `El valor de cada cuota es: $${valorCuota.toFixed(2)}`;
        }

        historialPrestamos.push({
            monto: prestamo.monto,
            cuotas: prestamo.cuotas,
            valorCuota: valorCuota.toFixed(2),
        });



      
        historialList.innerHTML = '';

      
        historialPrestamos.forEach((prestamo, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Préstamo ${index + 1}: Monto: $${prestamo.monto}, Cuotas: ${prestamo.cuotas}, Valor Cuota: $${prestamo.valorCuota}`;
            historialList.appendChild(listItem);
        });

     


        localStorage.setItem('historialPrestamos', JSON.stringify(historialPrestamos));
    } else {
        resultadoOutput.textContent = "Error: Ingrese un monto y número de cuotas válidos.";
    }
}





window.addEventListener('load', () => {
    const storedHistorial = localStorage.getItem('historialPrestamos');



    if (storedHistorial) {
        historialPrestamos = JSON.parse(storedHistorial);
        historialPrestamos.forEach((prestamo, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Préstamo ${index + 1}: Monto: $${prestamo.monto}, Cuotas: ${prestamo.cuotas}, Valor Cuota: $${prestamo.valorCuota}`;
            historialList.appendChild(listItem);
        });
    }
});





const borrarHistorialButton = document.getElementById('borrarHistorial');



borrarHistorialButton.addEventListener('click', () => {
    
    localStorage.removeItem('historialPrestamos');

    
    historialList.innerHTML = '';
});