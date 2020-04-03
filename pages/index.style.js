import css from "styled-jsx/css";

export const isMobileQueryString = "screen and (max-width: 480px)";
export const isPadQueryString = "screen and (max-width: 900px)";
export const isLaptopQueryString = "screen and (max-width: 1280px)";

export const loadingStyle = css`
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100vw - 16px);
    height: calc(100vh - 16px);
  }
`;

export default css`
  .wrapper {
    font-family: -apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto";
    width: 100%;
    color: #333;
    margin: 80px auto 40px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-around;
  }
  .card {
    padding: 18px;
    margin: 8px;
    flex: 1 1 280px;
    text-align: left;
    color: #434343;
    border: 1px solid #9b9b9b;
  }
  .card h3 {
    margin: 0;
    color: #067df7;
    font-size: 18px;
  }
  .card > span {
    display: inline-block;
    font-size: 12px;
    background: black;
    color: white;
    border-radius: 4px;
    padding: 4px 6px;
    margin-bottom: 4px;
  }
  .card p {
    margin: 0;
    padding: 12px 0 0;
    font-size: 13px;
    color: #333;
    column-count: 2;
  }
  .card p > span {
    display: block;
    margin-bottom: 4px;
  }

  table {
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid lightgray;
    padding: 8px 12px;
    white-space: nowrap;
  }

  th {
    text-transform: capitalize;
    background: darkgray;
    color: white;
  }

  td:nth-child(n + 3) {
    text-align: right;
  }

  @media ${isMobileQueryString} {
    .card p {
      column-count: 1;
    }
  }

  @media ${isLaptopQueryString} {
    th:nth-child(n + 10),
    td:nth-child(n + 10) {
      display: none;
    }
  }
`;
