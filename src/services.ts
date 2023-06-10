export type FileReader = {
	read(path: string): Promise<string>;
}

export type FileWriter = {
	write(path: string, content: string): Promise<void>;
}

export type IdGenerator = () => string;