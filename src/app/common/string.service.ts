import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StringService {

    public replaceSpecialCharacters(input: String): String {

        return input.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    public reverseSpecialCharacters(input: String): String {

        return input.replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, "\"")
            .replace(/&#39;/g, "'");
    }
}
