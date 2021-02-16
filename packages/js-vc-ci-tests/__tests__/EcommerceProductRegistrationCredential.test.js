const fs = require('fs');
const path = require('path');
const faker = require('faker');
const issuer = require('../services/issuer');

it('can issue / verify Ecommerce Product Registration', async () => {
  const { verified, verifiableCredential } = await issuer.issue({
    credentialSubject: {
      id: 'did:web:www.acme.com',
      type: 'EcommerceProductRegistrationCredential',
      productCode: faker.random.number(14),
      productCodeType: 'GTIN',
      certificateName: 'ACME Ecommerce Product Registration Credential',
    },
  }, [
    'https://www.w3.org/2018/credentials/v1',
    'https://w3id.org/traceability/v1',
  ]);
  expect(verified).toBe(true);
  fs.writeFileSync(path.resolve(__dirname, '../../../docs/credentials/EcommerceProductRegistrationCredential.json'), JSON.stringify(verifiableCredential, null, 2));
});