//in this training exercise will use spanish format
//in projects internalization must be handled

export function createDate(dateString: string) {
    const day = Number(dateString.slice(0, 2));
    const month = Number(dateString.slice(3, 5)) - 1; //january is month 0
    const year = Number(dateString.slice(6, 10));
    return new Date(year, month, day);
}

export function calculateAge(birthDate: Date) {
    const yearBirth = birthDate.getFullYear();
    const monthBirth = birthDate.getMonth();
    const dayBirth = birthDate.getDate();

    const now = new Date();

    const yearNow = now.getFullYear();
    const monthNow = now.getMonth();
    const dayNow = now.getDate();

    let age = yearNow - yearBirth;

    if (monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)) {
        age--;
    }
    return age;
}

export function isCandidateForPermanentDNI(birthDate: Date) {
    const miniumAgepermanent = 70;
    return calculateAge(birthDate) >= miniumAgepermanent;
}


//note getDay on an object Date gives the WEEK day
