import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  const [produkty, setProdukty] = useState([
    { id: 1, nazwa: "Notes", cena: 12.50 },
    { id: 2, nazwa: "Długopis", cena: 3.20 },
    { id: 3, nazwa: "Plecak", cena: 89.00 },
    { id: 4, nazwa: "Kalkulator", cena: 45.90 },
    { id: 5, nazwa: "Zakreślacz", cena: 4.75 }    
  ])

  const [koszyk, setKoszyk] = useState([])
  const [suma, setSuma] = useState()

  return (
    <div>
      <h2>Sklepik szkolny</h2>

      <ul className="list-group">
        {produkty.map(produkt => (
        <li className="list-group-item d-flex justify-content-between align-items-center" key={produkt.id}>
          {produkt.nazwa} – {produkt.cena} zł
          <button type="button" className="btn btn-sm btn-primary" onClick={() => {
            const dodawanyProdukt = produkty.find(przedmiot => produkt.id === przedmiot.id)       
            setKoszyk([...koszyk, { id: dodawanyProdukt.id, nazwa: dodawanyProdukt.nazwa, cena: dodawanyProdukt.cena, ilosc: 1}]);
            setSuma(0)
            koszyk.map(przedmiot => (setSuma(suma + przedmiot.cena)))
            console.log(`koszyk: ${koszyk.length} pozycji; suma: ${suma}`)
          }}>Do koszyka</button>
        </li>          
        ))}
      </ul>

      <h3>Koszyk ({koszyk.length} pozycji)</h3>
      {koszyk.length === 0 ? (
        <div className="alert alert-info">
          Koszyk jest pusty
        </div>
      ) : (
        <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Produkt</th>
              <th scope="col">Ilość</th>
              <th scope="col">Cena</th>
              <th scope="col">Suma</th>
              <th scope="col">Akcja</th>
            </tr>
          </thead>
          <tbody>
            {koszyk.map(produkt => (
              <tr>
                <td>{produkt.nazwa}</td>
                <td>{produkt.ilosc}</td>
                <td>{produkt.cena} zł</td>
                <td>{produkt.cena*produkt.ilosc} zł</td>
                <td><button type="button" className="btn btn-sm btn-outline-danger" onClick={() => {
                  const filteredKoszyk = koszyk.filter(przedmiot => (przedmiot.id != produkt.id))
                  setKoszyk(filteredKoszyk)
                  setSuma(0)
                  koszyk.map(przedmiot => (setSuma(suma - przedmiot.cena)))
                }}>Usuń</button></td>
              </tr>              
            ))}
          </tbody>
        </table>  
        <p>Suma {suma} zł</p>
        </div>
      )}
    </div>
  )
}

export default App
