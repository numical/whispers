const DOCS = `
<html>
  <head>
    <title>
        Whispers
    </title>
  </head>
  <body>
    <p>
      Chinese Whispers ('Telephone') with Google Speech API's.
    </p>
    <p>
      Available URL's:
        <ul>
          <li><a href="./playGame">/playGame [?(iterations=)&(text=)&(voice=[english|random])]</a></li>
          <li><a href="./listVoices">/listVoices</a></li>
        </ul>
    </p>
  </body>
<html>
`;

module.exports = async (req, res) => {
  res.status(200).send(DOCS);
};
