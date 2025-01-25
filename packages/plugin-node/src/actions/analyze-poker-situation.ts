// analyzeImage.ts

import {
    type Action,
    type IAgentRuntime,
    type Memory,
    type State,
    type HandlerCallback,
    composeContext,
    generateObject,
    type ActionExample,
    ModelClass,
    elizaLogger,
} from "@elizaos/core";
import { z } from "zod";

export const analyzePokerSituation: Action = {
    name: "ANALYZE_POKER_SITUATION",
    similes: ["ANALYZE_POKER_HAND", "ANALYZE_POKER_SPOT"],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        return true;
    },
    description: "Analyze a poker situation and provide strategic advice",
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        options: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> => {
        try {
            // Get the last memory, which should be the poker situation description
            const [lastMemory] = await runtime.messageManager.getMemories({
                roomId: message.roomId,
                count: 1,
            });

            if (!lastMemory?.content?.text) {
                elizaLogger.error("No poker situation description found");
                return false;
            }
            const pokerDescription = lastMemory.content.text;

            // Now, analyze the poker situation
            const analysisContext = composeContext({
                state: {
                    ...state,
                    pokerDescription,
                },
                template: `As {{agentName}}, analyze this poker situation and provide strategic advice.
                {{#if bio}}Use your background as {{bio}}.{{/if}}
                {{#if messageDirections}}Follow these style guidelines: {{messageDirections}}{{/if}}

                Situation to analyze: {{pokerDescription}}`,
            });

            const analysisResult = await generateObject({
                runtime,
                context: analysisContext,
                modelClass: ModelClass.MEDIUM,
                schema: z.object({
                    situation: z
                        .string()
                        .describe(
                            "Brief summary of the current poker situation"
                        ),
                    analysis: z
                        .string()
                        .describe("Detailed analysis of the poker situation"),
                    recommendation: z
                        .string()
                        .describe("Clear strategic recommendation"),
                }),
            });

            if (!analysisResult?.object) {
                elizaLogger.error("Failed to generate poker analysis");
                return false;
            }

            type AnalysisResult = {
                situation: string;
                analysis: string;
                recommendation: string;
            };

            const { situation, analysis, recommendation } =
                analysisResult.object as AnalysisResult;
            const responseText = `Situation: ${situation}\n\nAnalysis: ${analysis}\n\nRecommendation: ${recommendation}`;

            // Store the analysis in memory
            await runtime.messageManager.createMemory({
                userId: message.agentId,
                agentId: message.agentId,
                roomId: message.roomId,
                content: {
                    text: responseText,
                },
            });

            // Call the callback with the analysis
            if (callback) {
                callback({
                    text: responseText,
                });
            }

            return true;
        } catch (error) {
            elizaLogger.error(
                "Error in analyze-poker-situation handler:",
                error
            );
            return false;
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "What should I do in this poker situation?",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Analyzing the poker situation...",
                    action: "ANALYZE_POKER_SITUATION",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Situation: You're on the button with AKs facing a 3BB raise from MP.\n\nAnalysis: You have a premium hand in position against an MP open. Your hand has strong equity and plays well postflop.\n\nRecommendation: 3-bet to 9BB to build the pot and potentially isolate the raiser.",
                },
            },
        ],
    ] as ActionExample[][],
};

export default analyzePokerSituation;
