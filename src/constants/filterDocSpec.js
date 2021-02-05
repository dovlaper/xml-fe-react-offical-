import { Util } from "react-xml-editor";

const filterDocSpec = {
    elements: {
        RequestId: {
            
            hasText: true,
            asker: Util.askLongString,
        }
    }
}

export default filterDocSpec;

export const xml = (
    id,
    subName,
    subLastName,
    subCity,
    subStreet,
    subType,
    appealDate,
    reqDate,
    recCity,
    recStreet
) => `<?xml version="1.0" encoding="UTF-8"?>
<sh:DecisionAppealFilter xmlns:sh="http://www.shared.com" >
<RequestId>${id}</RequestId>
<SubmitterName>${subName}</SubmitterName>
<SubmitterLastname>${subLastName}</SubmitterLastname>
<SubmitterCity>${subCity}</SubmitterCity>
<SubmitterStreet>${subStreet}</SubmitterStreet>
<SubmitterType>${subType}</SubmitterType>
<RequestDate>${reqDate?.toLocaleDateString("en-CA") || ''}</RequestDate>
<AppealDate>${appealDate?.toLocaleDateString("en-CA") || ''}</AppealDate>
<RecipientCity>${recCity}</RecipientCity>
<RecipientStreet>${recStreet}</RecipientStreet>
</sh:DecisionAppealFilter>`