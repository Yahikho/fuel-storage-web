interface CookieConfig {
    name: string
    value: string
}

function setCookie(config: CookieConfig): void {
    document.cookie = `${config.name}=${config.value};path=/`;
}

function getCookie(name: string): string {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${name}=`)) {
            return cookie.substring(name.length + 1);
        }
    }
    return '';
}

function deleteCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

export { setCookie, getCookie, deleteCookie }