export const COMMISSIONER = '[Commissioner]';

export const GET_SILENCE_APPEALS = `${COMMISSIONER} GET_SILENCE_APPEALS`;
export const SET_SILENCE_APPEALS = `${COMMISSIONER} SET_SILENCE_APPEALS`;

export function getSilenceAppeals() {
    return {
        type: GET_SILENCE_APPEALS,
    }
}

export function setSilenceAppeals(payload) {
    return {
        type: SET_SILENCE_APPEALS,
        payload
    }
}


