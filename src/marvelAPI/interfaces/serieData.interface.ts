import { serieCharacter } from "src/characters/interfaces/serieCharacter.interface";
import { serieComic } from "src/comics/interfaces/serieComic.interface";
import { serieCreator } from "src/creators/interfaces/serieCreator.inteface";

export interface serieData {
    creators: serieCreator,
    comic: serieComic,
    character: serieCharacter
}