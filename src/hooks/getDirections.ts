import { useState, useCallback } from "react";
import axios from "axios";
import { allowedItems } from "./data/allowedItems";
import type { BlogData, BlogEntry } from "hooks/types";
import { blogData } from "hooks/data/locationData";

interface OpenAIResponse {
  choices: {
    message: {
      function_call?: {
        arguments?: string;
      };
    };
  }[];
}

interface ProcessedData {
  search: string;
  keywords: string[];
  limit: number;
  offset: number;
}

const getDirections = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<BlogData>([]);
  const [extractedKeywords, setExtractedKeywords] = useState<string[]>([]);

  const processSearch = useCallback(async (searchTerm: string) => {
    setLoading(true);
    setError(null);

    const parseOpenAIResponse = (data: OpenAIResponse): ProcessedData => {
      const functionCall = data.choices[0].message.function_call;
      if (functionCall?.arguments) {
        const args = JSON.parse(functionCall.arguments);
        // Limit keywords to allowed items and up to 10 keywords
        const keywords = args.keywords
          .filter((kw: string) => allowedItems.keywords.includes(kw))
          .slice(0, 10); // Limit to 10 keywords
        return {
          search: args.search,
          keywords,
          limit: args.limit,
          offset: args.offset,
        };
      }
      return {
        search: "",
        keywords: [],
        limit: 10,
        offset: 0,
      };
    };

    try {
      const apiUrl = "https://api.openai.com/v1/chat/completions";
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };

      const requestBody = {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Extract up to 10 keywords from the following search string based on the allowed items. Here are the allowed items:
Keywords: ${allowedItems.keywords.join(", ")}
Search String: "${searchTerm}"`,
          },
        ],
        functions: [
          {
            name: "set_search_parameters",
            parameters: {
              type: "object",
              properties: {
                search: { type: "string" },
                keywords: { type: "array", items: { type: "string" } },
                limit: { type: "number" },
                offset: { type: "number" },
              },
              required: ["search", "keywords", "limit", "offset"],
            },
          },
        ],
        function_call: "auto",
        max_tokens: 550,
      };

      const { data } = await axios.post<OpenAIResponse>(apiUrl, requestBody, {
        headers,
      });

      const searchQueryObject = parseOpenAIResponse(data);

      // Save the actual keywords extracted by ChatGPT
      setExtractedKeywords(searchQueryObject.keywords);

      // Filter the blogData based on the keywords
      const filteredData = blogData.filter((item: BlogEntry) => {
        const itemKeywords = item.keywords?.map((kw) => kw.toLowerCase()) ?? [];
        return searchQueryObject.keywords.some((kw) =>
          itemKeywords.includes(kw.toLowerCase())
        );
      });

      setResults(filteredData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { processSearch, results, extractedKeywords, loading, error };
};

export default getDirections;
