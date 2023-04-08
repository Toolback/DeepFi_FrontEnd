// import fs from 'fs';

// export function addProtocolToken (newToken) {
//   // Read the contents of the file into a variable
//   const fileContents = fs.readFileSync('/path/to/protocolTokens.js', 'utf8');

//   // Parse the contents of the file into a JavaScript object
//   const { protocolTokens } = eval(fileContents);

//   // Add the new object to the protocolTokens array
//   protocolTokens.push(newToken);

//   // Write the updated protocolTokens array back to the file
//   fs.writeFileSync('/path/to/protocolTokens.js', `export const protocolTokens = ${JSON.stringify(protocolTokens, null, 2)};\n`, 'utf8');
// }
