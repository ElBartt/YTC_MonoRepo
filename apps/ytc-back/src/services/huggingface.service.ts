/*
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

export class HuggingFaceService {
    private static instance: HuggingFaceService;
    private classifier;
    private translater;

    private classifierModelName = 'Xenova/bart-large-mnli';
    private translaterModelName = 'Xenova/nllb-200-distilled-600M'; // 'Xenova/opus-mt-fr-en';
    private videoTitlePlaceholder = '<TITLE>';
    private hypothesis = `The commment from video "${this.videoTitlePlaceholder}" is {}.`;

    public categories = ['positif', 'negatif', 'constructif', 'question', 'hors sujet'];

    private constructor() {
        this.initClassifier();
    }

    public static getInstance(): HuggingFaceService {
        if (!HuggingFaceService.instance) {
            HuggingFaceService.instance = new HuggingFaceService();
        }

        return HuggingFaceService.instance;
    }

    private async initClassifier() {
        const TransformersApi = Function('return import("@xenova/transformers")')();
        const { pipeline } = await TransformersApi;
        this.classifier = await pipeline('zero-shot-classification', this.classifierModelName, {
            quantized: false,
            batch_size: 5,
            cache_dir: './cache',
        });
        // TODO : check if we need to translate the texts
        // this.translater = await pipeline('translation', this.translaterModelName, {
        //     cache_dir: './cache',
        // });
    }

    public async predictBatch(texts: string[], videoTitle: string): Promise<(string | null)[] | null> {
        console.log(`Predicting categories for '${texts.length}' texts for video '${videoTitle}'`)
        try {
            // TODO : check if we need to translate the texts
            // const translations = await this.translater(texts, {
            //     src_lang: 'fra_Latn',
            //     tgt_lang: 'eng_Latn',
            // });
            // texts = translations.map(translation => translation.translation_text);

            // TODO: check if hypothesis is still needed
            const predictions = await this.classifier(texts, this.categories) //, { hypothesis_template: this.hypothesis.replace(this.videoTitlePlaceholder, videoTitle) });
            
            // TODO: not only return the first label but all scores
            return predictions.map(prediction => prediction.labels[0]);
        } catch (e) {
            console.error(`Error predicting categories for texts '${texts}': ${e}`);
            return null;
        }
    }
}