/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Configuration, OpenAIApi } from "openai";
import { OAI_CONF } from "../configs/openai.config";

const configuration = new Configuration(OAI_CONF);

/**
 * A class that provides access to the OpenAI API for natural language processing.
 */
export class OpenAIService {
    private openAI: OpenAIApi;

    /**
     * Creates an instance of the OpenAI class and initializes the OpenAIApi object.
     * @constructor
     */
    constructor() {
        this.openAI = new OpenAIApi(configuration);
    }

    private readonly systemContext = "Vous êtes en train d'aider un créateur de vidéos YouTube à classifier les commentaires de sa vidéo. Les catégories disponibles sont : 'Aucune'-1, 'Question'-2, 'Idée'-3, 'Feedback'-4, 'Malveillant'-5. L'objectif est d'aider le créateur à identifier facilement les commentaires qui pourraient lui être utiles. La catégorie 'Aucune' doit être sélectionnée lorsque le commentaire ne correspond à aucune des autres catégories et ne contient pas d'informations utiles pour le créateur. Il est important de noter que les catégories 'Feedback' et 'Idée' sont spécifiquement liées à la vidéo, son contenu et son concept. Les commentaires de ces catégories doivent contenir des arguments et des propositions réelles, plutôt qu'une simple appréciation générale ou spécifique. Le fromat de sortie doit etre 'nombre'";
    private readonly example1 = "Trop contente de te revoir, je souhaite que tu n ai plus le besoin de faire une pause dans l avenir mais surtout ne te force pas car ta santé passe avant tout Bisousss <3";
    private readonly result1 = "1";
    private readonly example2 = "Le son de ton micro été vraiment trop bas !";
    private readonly result2 = "4";
    private readonly example3 = "Excellent concept je me suis taper des barres et c'est très rare que je commente une vidéo. Tu devrais faire un tour des villes de France avec ce concept 👍";
    private readonly result3 = "3";
    private readonly example4 = "Merci énormément d'apporter la bonne humeur comme ça je me tape jamais autant de fou rire que devant vos vidéos ! Je pense qu'on vous le dit beaucoup mais vous êtes incroyables !";
    private readonly result4 = "1";
    private readonly example5 = "J'ai une question sur la vidéo, comment puis-je vous contacter ?";
    private readonly result5 = "2";
    
    /**
     * Runs a test of the OpenAI API completion functionality by sending a prompt to the API and logging the response.
     */
    async ClassifyComment(comment: string): Promise<string> {
        return "1"; // Safe Lock !

        // const completion = await this.openAI.createChatCompletion({
        //     model: "gpt-3.5-turbo",
        //     max_tokens: 1,
        //     frequency_penalty: 0.2,
        //     presence_penalty: 0.2,
        //     messages: [
        //         {"role": "system", "content": this.systemContext},
        //         {"role": "user", "content": this.example1},
        //         {"role": "assistant", "content": this.result1},
        //         {"role": "user", "content": this.example2},
        //         {"role": "assistant", "content": this.result2},
        //         {"role": "user", "content": this.example3},
        //         {"role": "assistant", "content": this.result3},
        //         {"role": "user", "content": this.example4},
        //         {"role": "assistant", "content": this.result4},
        //         {"role": "user", "content": this.example5},
        //         {"role": "assistant", "content": this.result5},
        //         {"role": "user", "content": comment}
        //     ],
        // });

        // console.log(completion.data.choices[0].message.content);
        // console.log(completion.data.usage?.total_tokens);
        // return completion.data.choices[0].message.content;
    }
}