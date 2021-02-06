import { Util } from 'react-xml-editor/lib';

const createRescriptDocSpec = {
    elements: {
        Resenje: {
            attributes: {
                xmlns: {
                    isInvisible: true,
                },
                'xmlns:sh': {
                    isReadOnly: true
                },
                about: {
                    isInvisible: true,
                },
                dopustena_zalba: {
                    asker: Util.askPicklist([{
                        value: 'da', caption: 'da'
                    },{
                        value: 'ne', caption: 'ne',
                    }]),
                },
            },
        },
        Status_zalbe: {
            attributes: {},
            asker: Util.askPicklist([{
                value: 'ODBIJENA', caption: 'ODBIJENA'
            },{
                value: 'PRIHVACENA', caption: 'PRIHVACENA',
            }]),
        },
        Stavke_resenja: {
            attributes: {
                broj: {
                    asker: Util.askPicklist([{
                        value: 'da', caption: 'da'
                    },{
                        value: 'ne', caption: 'ne',
                    }]),
                }
            },
            menu: [{
                caption: "Dodaj tacku",
                action: Util.newElementChild('<sh:Tacka broj="3">Tacka 3</sh:Tacka>'),
                actionParameter: "param"
            }]
        },
        'sh:Ime': {
            readOnly: true,
            asker: Util.askPicklist([{
                value: 'ODBIJENA', caption: 'ODBIJENA'
            },{
                value: 'PRIHVACENA', caption: 'PRIHVACENA',
            }]),
        }
            // menu: [{
            //     action: Util.newElementChild('<child />'),
            //     caption: 'Append child <child />',
            // },{
            //     action: Util.newAttribute({
            //         name: 'label',
            //         value: 'default value',
            //     }),
            //     caption: 'Add attribute @label',
            //     hideIf: (xml, id) => {
            //         console.log(xml, id)
            //         const element = Util.getXmlNode(xml, "testId");
            //         return element && element.$ && typeof element.$.label !== 'undefined';
            //     },
            // },{
            //     action: Util.deleteElement,
            //     caption: 'Delete this <item />',
            // },{
            //     action: Util.newElementBefore('<item />'),
            //     caption: 'New <item /> before this',
            // },{
            //     action: Util.newElementAfter('<item />'),
            //     caption: 'New <item /> after this',
            // },{
            //     action: Util.duplicateElement,
            //     caption: 'Copy <item />',
            // },{
            //     action: Util.moveElementUp,
            //     caption: 'Move <item /> up',
            //     // hideIf: (xml, id) => !Util.canMoveElementUp(xml, id),
            // },{
            //     action: Util.moveElementDown,
            //     caption: 'Move <item /> down',
            //     // hideIf: (xml, id) => !Util.canMoveElementDown(xml, id),
            // }]
        },
};

export default createRescriptDocSpec;
export const xmlString = (requestId,submitterId) => {
    return `
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <ObavestenjeRoot xmlns="http://www.obavestenje.com" xmlns:ns2="http://www.shared.com" rel="pred:informationForRequest" href="${requestId}" sendTo="${submitterId}">
        <Obavestenje>
            <Organ>
                <Naziv></Naziv>
                <ns2:Adresa>
                    <ns2:Grad property="pred:submitterCity">Beograd</ns2:Grad>
                    <ns2:Ulica property="pred:submitterStreet"></ns2:Ulica>
                    <ns2:Broj property="pred:submitterStreetnum">1</ns2:Broj>
                    <ns2:Postanski_broj>11000</ns2:Postanski_broj>
                </ns2:Adresa>
            </Organ>
            <Broj_predmeta>12</Broj_predmeta>
            <Datum>2020-10-01</Datum>
            <Podnosilac>
                <Fizicko_lice about="${requestId}" rel="pred:submitterOfRequest" href="${submitterId}">
                    <ns2:Ime>Ime podnosiova</ns2:Ime>
                    <ns2:Prezime>lalala</ns2:Prezime>
                    <ns2:Adresa>
                        <ns2:Grad property="pred:submitterCity">Beograd</ns2:Grad>
                        <ns2:Ulica property="pred:submitterStreet"></ns2:Ulica>
                        <ns2:Broj property="pred:submitterStreetnum">1</ns2:Broj>
                        <ns2:Postanski_broj>11000</ns2:Postanski_broj>
                    </ns2:Adresa>
                </Fizicko_lice>
            </Podnosilac>
            <Naslov></Naslov>
            <Podnaslov></Podnaslov>
            <Odgovor>
                <Godina_zahteva>2020</Godina_zahteva>
                <Opis_trazene_informacije></Opis_trazene_informacije>
                <Datum>2020-10-02</Datum>
                <Sati>23</Sati>
                <Sati_od>23</Sati_od>
                <Sati_do>23</Sati_do>
                <Lokacija>
                    <ns2:Adresa>
                        <ns2:Grad property="pred:submitterCity">Beograd</ns2:Grad>
                        <ns2:Ulica property="pred:submitterStreet"></ns2:Ulica>
                        <ns2:Broj property="pred:submitterStreetnum">1</ns2:Broj>
                        <ns2:Postanski_broj>11000</ns2:Postanski_broj>
                    </ns2:Adresa>
                    <Broj_kancelarije xmlns:pred="http://www.tim21.com/predicate/" xmlns:sh="http://www.shared.com" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">12</Broj_kancelarije>
                </Lokacija>
            </Odgovor>
            <Podaci_o_placanju>
                <Pojedinacni_troskovi>
                    <Trosak>
                        <Naziv>Naziv 1</Naziv>
                        <Cena>3000</Cena>
                    </Trosak>
                    <Trosak>
                        <Naziv>Naziv 1</Naziv>
                        <Cena>3000</Cena>
                    </Trosak>
                </Pojedinacni_troskovi>
                <Ukupni_troskovi>5500</Ukupni_troskovi>
                <Broj_racuna>12345678901234567</Broj_racuna>
                <Poziv_na_broj>98</Poziv_na_broj>
            </Podaci_o_placanju>
            <Dostavljeno>IMENOVANOM</Dostavljeno>
        </Obavestenje>
    </ObavestenjeRoot>
`};
