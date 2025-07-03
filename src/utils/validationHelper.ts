import { REGEX_PATTERNS } from "@/constants/regexPatterns";

export const validateEmail = (input: string): boolean => new RegExp(REGEX_PATTERNS.email).test(input);

export const validateUsername = (input: string): boolean => new RegExp(REGEX_PATTERNS.username).test(input);

export const validatePassword = (input: string): boolean => new RegExp(REGEX_PATTERNS.password).test(input);
