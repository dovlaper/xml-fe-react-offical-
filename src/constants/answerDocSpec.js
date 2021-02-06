
const silenceAppealDocSpec = {
    elements: {
    }
  };

export const xmlString = (appealId) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <IzjasnjavanjeZalba xmlns="http://www.izjasnjavanjezalba.com"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.izjasnjavanjezalba.com ../xsd/IzjasnjavanjeZalba.xsd">
        <IzjasnjavanjeZalbaDokument>
            <ID_Zalbe>${appealId}</ID_Zalbe>
            <Odgovor>Unesite odgovor</Odgovor>
        </IzjasnjavanjeZalbaDokument>
    </IzjasnjavanjeZalba>
    `};

export default silenceAppealDocSpec;