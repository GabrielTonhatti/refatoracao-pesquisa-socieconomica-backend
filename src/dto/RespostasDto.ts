class RespostasDto {
    private labels: Array<string>;
    private data: Array<number>;

    public constructor() {
        this.labels = [];
        this.data = [];
    }

    public getLabels(): Array<string> {
        return this.labels;
    }

    public setLabels(labels: Array<string>): void {
        this.labels = labels;
    }

    public getData(): Array<number> {
        return this.data;
    }

    public setData(data: Array<number>): void {
        this.data = data;
    }

    public incrementarData(index: number): void {
        if (this.data[index] === undefined) {
            this.data[index] = 1;
        } else {
            this.data[index]++;
        }
    }

    public static of(labels: Array<string>, data: Array<number>): RespostasDto {
        const respostasDto: RespostasDto = new RespostasDto();

        respostasDto.setLabels(labels);
        respostasDto.setData(data);

        return respostasDto;
    }

    public static ofData(resposta: string, data: number): RespostasDto {
        const respostasDto: RespostasDto = new RespostasDto();
        respostasDto.getLabels().push(resposta);
        respostasDto.getData().push(data);

        return respostasDto;
    }
}

export default RespostasDto;
