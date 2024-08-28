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
}
