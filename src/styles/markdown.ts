const DEFAULT_MARKDOWN = `
  font-size: 16px;  

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  em,
  b,
  u,
  p,
  a,
  dl,
  dt,
  dd,
  fieldset,
  form,
  label,
  legend,
  caption,
  table,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  input {
    margin: revert;
    padding: revert;
    border: revert;
    font-size: revert;
    text-decoration: revert;
  }

  pre,
  code {
    font: revert;
  }

  a {
    color: blue;
  }

  menu,
  ol,
  ul {
    margin: revert;
    padding: revert;
    list-style: revert;
  }

  blockquote,
  q {
    quotes: revert;
  }
`;

export default DEFAULT_MARKDOWN;
