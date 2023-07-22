import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ParsedOfferDTO } from './dto/ParsedOfferDTO';

@Injectable()
export class OfferSiteParser {
  constructor(private readonly http: HttpService) {}

  async loadPage(offerId: number) {
    const page = await this.http.axiosRef.get(
      `https://vstup.edbo.gov.ua/offer/${offerId}`,
      {
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'accept-language': 'uk',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'sec-ch-ua':
            '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-requested-with': 'XMLHttpRequest',
          cookie: 'PHPSESSID=544m973nvo1vojc29rprf9n3k3',
          Referer: `https://vstup.edbo.gov.ua/offer/${offerId}/`,
        },
      },
    );
    return page.data;
  }

  async parsePage(offerId: number): Promise<ParsedOfferDTO | null> {
    const page = await this.loadPage(offerId);

    try {
      const payload = /^let offer = (.+)$/gim.exec(page);
      if (!payload) {
        return null;
      }
      const parsed = JSON.parse(payload[1]);
      const specialty = parsed.usn;
      const university = parsed.un;
      const faculty = parsed.ufn;
      const freeSize = parsed.ox;
      const hasFreeSlots = parsed.ustn === 'Відкрита';

      if (!specialty || !university || !faculty || !freeSize || !hasFreeSlots) {
        return null;
      }

      return {
        title: [specialty, university, faculty].join(' > '),
        freeSize: freeSize,
      };
    } catch {
      return null;
    }
  }
}
