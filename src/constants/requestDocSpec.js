import { Util } from 'react-xml-editor/lib';

const silenceAppealDocSpec = {
    elements: {
        'ns3:tip_zahteva': {
            asker: Util.askPicklist([{
                value: 'KOPIJA DOKUMENTA', caption: 'Kopija dokumenta'
            },{
                value: 'UVID U DOKUMENT', caption: 'Uvid u dokument',
            },{
                value: 'OBAVESTENJE DA LI POSEDUJE INFORMACIJU', caption: 'Obavestenje da li poseduje informaciju',
            }]),
        }
    }
  };

export const xmlString = (citizenId) => {
    return `<ZahtevRoot 
    xmlns="http://www.zahtev.com"
    xmlns:sh="http://www.shared.com"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.zahtev.com ../xsd/zahtev.xsd"
    xmlns:pred="http://www.tim21.com/predicate/"
    
    
    rel="pred:submitter"
    href="http://users/${citizenId}"
  >
<zahtev_dokument
      
>
    <nadlezni_organ>
        <naziv property="pred:institutionName">Neko ime</naziv>
        <sediste property="pred:institutionOffice">Grad u kom se nalazi</sediste>
    </nadlezni_organ>

    <naslov>
        З А Х Т Е В
        за приступ информацији од јавног значаја
    </naslov>

    <sadrzaj>
        На основу члана 15. ст. 1. Закона о слободном приступу информацијама од јавног значаја
        („Службени гласник РС“, бр. 120/04, 54/07, 104/09 и 36/10), од горе наведеног органа захтевам:*

        <tip_zahteva property="pred:requestType" >UVID U DOKUMENT</tip_zahteva>

        достављање копије документа који садржи тражену информацију:**
        <nacini_dostave>
            <POSTA property="pred:delivery" content="POSTA"></POSTA>
        </nacini_dostave>



        Овај захтев се односи на следеће информације:

        <opis_informacije></opis_informacije>

        <trazilac_informacije
                rel="pred:submitter"
                href="http://users/${citizenId}"
        >
            <sh:Ime property="pred:submitterName">Milenaa</sh:Ime>
            <sh:Prezime property="pred:submitterLastname"></sh:Prezime>
            <sh:Adresa>
                <sh:Grad property="pred:submitterCity">Beograd</sh:Grad>
                <sh:Ulica property="pred:submitterStreet"></sh:Ulica>
                <sh:Broj property="pred:submitterStreetnum">1</sh:Broj>
                <sh:Postanski_broj>11000</sh:Postanski_broj>
            </sh:Adresa>
            <sh:drugi_podaci_za_kontakt></sh:drugi_podaci_za_kontakt>
        </trazilac_informacije>

        <datum_vreme>
            <sh:vreme property="appealTime">09:15:00</sh:vreme>
            <sh:datum property="appealDate">2020-09-10</sh:datum>
        </datum_vreme>

    </sadrzaj>

    <fusnote>
        <fusnota>* У кућици означити која законска права на приступ информацијама желите да остварите.</fusnota>
        <fusnota>** У кућици означити начин достављања копије докумената.</fusnota>
        <fusnota>*** Када захтевате други начин достављања обавезно уписати који начин достављања захтевате.</fusnota>
    </fusnote>



</zahtev_dokument>
</ZahtevRoot>  `};

export default silenceAppealDocSpec;