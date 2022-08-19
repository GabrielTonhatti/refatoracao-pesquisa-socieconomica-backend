import moment from "moment-timezone";

export class Utils {
    private static readonly DATA_TIME_FORMAT: string = "DD/MM/yyyy HH:mm:ss";
    private static readonly TIME_ZONE: string = "America/Sao_Paulo";

    public getCurrentDateTime(): string {
        return moment().tz(Utils.TIME_ZONE).format(Utils.DATA_TIME_FORMAT);
    }

    public ordenarArray(array: Array<any>): Array<string> {
        const novoArray: Array<number> = array.map((item: any): number => {
            if (Number(item)) {
                return Number(item);
            }

            return item;
        })
            .filter((item: any): boolean => item !== undefined);
        for (
            let posSelecionada: number = 0;
            posSelecionada < novoArray.length - 1;
            posSelecionada++
        ) {
            let posicaoMenor: number = posSelecionada + 1;

            for (let i: number = posicaoMenor + 1; i < novoArray.length; i++) {
                if (novoArray[posicaoMenor] > novoArray[i]) {
                    posicaoMenor = i;
                }
            }

            if (novoArray[posSelecionada] > novoArray[posicaoMenor]) {
                [novoArray[posSelecionada], novoArray[posicaoMenor]] = [
                    novoArray[posicaoMenor],
                    novoArray[posSelecionada]
                ];
            }
        }

        return novoArray
            .map((item: number): string => item.toString());
    }
}

export default new Utils();
