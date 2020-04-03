<blockquote>
In this article, I will explain how to handle media-query through Javascript. And provide an example to explain why I think sometimes using Javascript is better than handling through CSS.
</blockquote>

## Agenda

- [Why not handle it through CSS?](#agenda-1)
- [matchMedia](#agenda-2)
- [Example](#agenda-3)
- [CSS-in-JS](#agenda-4)
- [Custom React Hook](#agenda-5)

### Why not handle it through CSS? <a name="agenda-1"></a>

Because the user experience in desktop and mobile is pretty different. Therefore, we might have to design a totally different layout for mobile and desktop devices.

The most common example is the table. In the desktop and laptop, we can use the traditional table to display all the information. However, in the mobile device, displaying too many columns might not be friendly for the users.

If we want to design an RWD page as below, we can still use media-query through CSS. However, the code will become way more complicated than it has to be. Therefore, I believe in this scenario, handling through Javascript will be a better solution.

![table](https://i.imgur.com/CWOC9Ju.png)

### matchMedia <a name="agenda-2"></a>

To handle media-query through Javascript, we just need to pass the query string to `matchMedia` and add an event listener. Then we will be able to know if the current device matches the query string or not.

```Javascript
var mql = window.matchMedia('(max-width: 600px)');

function screenTest(e) {
  if (e.matches) {
    /* the viewport is 600 pixels wide or less */
    document.body.style.backgroundColor = 'red';
  } else {
    /* the viewport is more than than 600 pixels wide */
    document.body.style.backgroundColor = 'blue';
  }
}

mql.addListener(screenTest);
```

As well as the browser support is good enough for most of the use cases.  
![matchMedia-browser-support](https://i.imgur.com/4vYfzIn.png)

### Example <a name="agenda-3"></a>

Here is an example using React.js.

```Javascript
import React, { useEffect, useState } from "react";

const displayKeys = [
  "symbol",
  "name",
  "price",
  "change",
  "dayLow",
  "dayHigh",
  "volume",
  "avgVolume",
  "open",
  "previousClose",
  "eps",
  "pe"
];

const Home = () => {
  // fetch data
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://financialmodelingprep.com/api/v3/quote/AAPL,FB,GOOGL,AMZN")
      .then(res => res.json())
      .then(res => {
        if (res && res.length > 0) setData(res);
      });
  }, []);

  // handle media query
  const [isMobile, setIsMobile] = useState(false);
  function mqChange(mq) {
    setIsMobile(mq.matches);
  }
  useEffect(() => {
    const mq = window.matchMedia('screen and (max-width: 900px)');
    mq.addListener(mqChange);
    mqChange(mq);

    return () => {
      mq.removeListener(mqChange);
    };
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  // display card for mobile device, table for desktop device
  return (
    <div className="wrapper">
      {isMobile ? (
        data.map(item => (
          <div key={item.symbol} className="card">
            <span>{item.symbol}</span>
            <h3>{item.name}</h3>
            <p>
              <span>Price: {item.price}</span>
              <span>Change: {item.change}</span>
              <span>Volume: {item.volume}</span>
              <span>DayLow: {item.dayLow}</span>
              <span>DayHigh {item.dayHigh}</span>
            </p>
          </div>
        ))
      ) : (
        <table>
          <thead>
            <tr>
              {displayKeys.map(key => <th key={key}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.symbol}>
                {displayKeys.map(key => <td key={key}>{item[key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
```

If you're not familiar with React hook, here is another version based on the class component.

```Javascript
import React, { Component } from "react";

const displayKeys = [
  "symbol",
  "name",
  "price",
  "change",
  "dayLow",
  "dayHigh",
  "volume",
  "avgVolume",
  "open",
  "previousClose",
  "eps",
  "pe"
];

export default class Class extends Component {
  state = {
    data: [],
    isMobile: false
  };

  componentDidMount() {
    this.fetchData();
    this.mq = window.matchMedia('screen and (max-width: 900px)');
    this.mq.addListener(this.mqChange);
    this.mqChange(this.mq);
  }

  componentWillUnmount() {
    if (this.mq) {
      this.mq.removeListener(this.mqChange);
    }
  }

  fetchData = () => {
    fetch("https://financialmodelingprep.com/api/v3/quote/AAPL,FB,GOOGL,AMZN")
      .then(res => res.json())
      .then(res => {
        if (res && res.length > 0) {
          this.setState({
            data: res
          });
        }
      });
  };

  mqChange = mq => {
    this.setState({ isMobile: mq.matches });
  };

  render() {
    const { data, isMobile } = this.state;

    if (data.length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <div className="wrapper">
        {isMobile ? (
          data.map(item => (
            <div key={item.symbol} className="card">
              <span>{item.symbol}</span>
              <h3>{item.name}</h3>
              <p>
                <span>Price: {item.price}</span>
                <span>Change: {item.change}</span>
                <span>Volume: {item.volume}</span>
                <span>DayLow: {item.dayLow}</span>
                <span>DayHigh {item.dayHigh}</span>
              </p>
            </div>
          ))
        ) : (
          <table>
            <thead>
              <tr>
                {displayKeys.map(key => <th key={key}>{key}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.symbol}>
                  {displayKeys.map(key => <td key={key}>{item[key]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
```

### CSS-in-JS <a name="agenda-4"></a>

Despite using Javascript to handle media-query gives us more flexibility, but if it's just a small style change rather than totally different layout, then handling through CSS is still a better choice.

For example, if we want to display the body of our card with two columns for the pad device, and a single column for the mobile device. Then using CSS should be a better solution.

```css
.card p {
  column-count: 2;
}
@media screen and (max-width: 480px) {
  .card p {
    column-count: 1;
  }
}
```

In this scenario, if we use CSS-in-JS, we can share the query-string between CSS and JS, this will make the code easier to maintain.  
_Here I use [styled-jsx](https://github.com/zeit/styled-jsx), you can replace by any CSS-in-JS framework you want_

```Javascript
// @index.style.js
import css from "styled-jsx/css";

// share query string between CSS and Javascript
export const isMobileQueryString = "screen and (max-width: 480px)";
export const isPadQueryString = "screen and (max-width: 900px)";
export const isLaptopQueryString = "screen and (max-width: 1280px)";

export default css`
  ...

  @media ${isMobileQueryString} {
    .card p {
      column-count: 1;
    }
  }
`;
```

![mobile-pad](https://i.imgur.com/3v45nZS.png)

### Custom React Hook <a name="agenda-5"></a>

In the above example, we use `useState` and `useEffect` to handle media-query. If you're familiar with React hook, you should notice that we can easily create a custom hook for it.

```Javascript
import { useEffect, useState } from "react";

export default function useMediaQuery(queryString) {
  const [isMatch, setIsMatch] = useState(false);
  function mqChange(mq) {
    setIsMatch(mq.matches);
  }

  useEffect(() => {
    const mq = window.matchMedia(queryString);
    mq.addListener(mqChange);
    mqChange(mq);

    return () => {
      mq.removeListener(mqChange);
    };
  }, []);

  return isMatch;
}
```

The final result will look like this. If we need to render different HTML elements, we use Javascript to handle it. If we only need to adjust some styles, then we can still use the CSS media query.  
![all-size](https://i.imgur.com/y7Nnw6M.png)

---

## Reference

- [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
- [MediaQueryList](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList)
- [can i use: matchMedia](https://caniuse.com/#feat=matchmedia)
