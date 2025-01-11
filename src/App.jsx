import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = useState("KZT")
  const [toCurrency, setToCurrency] = useState("USD")
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(1)

  // const [valute, setValute] = useState({})
  const valuteRef = useRef({})

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then(res => res.json())
    .then(data => {
      console.log(data.Valute)
      // setValute(data.Valute)
      valuteRef.current = data.Valute
      onChangeToPrice(1)
    }).catch(err => {
      console.error(err)
      alert('Не удалось получить информацию о валютах')
    })
  }, [])


  const onChangeFromPrice = (value) => {
    const result = (value / valuteRef.current[fromCurrency]?.Value) * valuteRef.current[toCurrency]?.Value
    setToPrice(result.toFixed(3))
    setFromPrice(value)
  }

  const onChangeToPrice = (value) => {
    const result = (valuteRef.current[fromCurrency]?.Value / valuteRef.current[toCurrency]?.Value) * value;
    setFromPrice(result.toFixed(3))
    setToPrice(value)
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])

  useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])

  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default App;
