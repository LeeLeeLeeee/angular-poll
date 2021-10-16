import { Inject, Injectable, Injector } from "@angular/core";
import { QuestionListService } from "src/app/shared/services/question-list.service";


export type QuestionType = 'single' | 'multi' | 'attribute' | 'rank' | 'text' | 'number' | 'description' | 'scale';

export type ExampleType = {
    id: number,
    label: string,
    value: string,
    thumbnail: string,
}

export type AttributeType = {
    id: number,
    label: string,
    value: string,
    thumbnail: string,
}

export type MediaType = {
    id: number,
    name?: string,
    blobData: string,
}

export type QuestionItem = {
    id: number,
    questionType: QuestionType,
    title: string,
    description?: string,
    example?: ExampleType[],
    attribute?: AttributeType[],
    waitDuration?: number,
    mediaItem?: MediaType[],
    checked: boolean,
    clicked: boolean,
    createdDate: string,
    updatedDate: string,
}

interface QuestionMethod {
    resetQuestionItem(): void
    resetTitle(): void
    resetDescription(): void
    resetExample(): void
    resetAttribute(): void
    setQuestionItem(questionItem: QuestionItem): QuestionItem
    setWaitDuration(second: number): number
    setMediaItem(blob: string): string
    setPreview(bool: boolean): boolean
    getQuestionItem(): QuestionItem
    copyQuestionItem(targetQuestionId: number): void
}

const injector = Injector.create({
    providers: [
        { provide: QuestionListService }
    ]
})

export default class Question implements QuestionMethod {
    private questionItem : QuestionItem = null;
    private questionListService: QuestionListService;
    constructor(questionType: QuestionType = 'single') {
        this.questionListService = injector.get(QuestionListService);
        this.questionItem = {
            id: this.questionListService.getQuestionMaxId(),
            questionType: questionType,
            title:'',
            description:'',
            example:[],
            attribute:[],
            waitDuration:0,
            mediaItem:[],
            checked:false,
            clicked:false,
            createdDate: new Date().toString(),
            updatedDate: new Date().toString(),
        }
        this.questionListService.appendQuestion(this)
    }

    resetQuestionItem(): void {
        this.questionItem = {
            ...this.questionItem,
            title: '',
            description:'',
            example:[],
            attribute:[],
            waitDuration:0,
            mediaItem:[],
            checked:false,
            clicked:false,
        }
    }

    resetTitle(): void {
        throw new Error("Method not implemented.");
    }

    resetDescription(): void {
        throw new Error("Method not implemented.");
    }

    resetExample(): void {
        throw new Error("Method not implemented.");
    }

    resetAttribute(): void {
        throw new Error("Method not implemented.");
    }

    setQuestionItem(questionItem: QuestionItem): QuestionItem {
        this.questionItem = {            
            ...questionItem
        }
        return this.questionItem;
    }

    setWaitDuration(second: number): number {
        throw new Error("Method not implemented.");
    }

    setMediaItem(blob: string): string {
        throw new Error("Method not implemented.");
    }

    setPreview(bool: boolean): boolean {
        throw new Error("Method not implemented.");
    }

    getQuestionItem(): QuestionItem {
        return this.questionItem;
    }

    copyQuestionItem(targetQuestionId: number): void {
        throw new Error("Method not implemented.");
    }

}