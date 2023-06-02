const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

const pasta = process.env.FOLDER_PATH;
const novaPastaAutorizados = pasta + "/XMLAutorizado";
const novaPastaNaoAutorizados = pasta + "/XMLNaoAutorizado";



if (!fs.existsSync(novaPastaAutorizados)) {
    fs.mkdirSync(novaPastaAutorizados);
}

if (!fs.existsSync(novaPastaNaoAutorizados)) {
    fs.mkdirSync(novaPastaNaoAutorizados);
}


fs.readdir(pasta, (err, arquivos) => {
    if(err) {
        console.log("Erro ao ler a pasta:", err);
        return;
    }

    const arquivosXML = arquivos.filter(arquivo => path.extname(arquivo).toLowerCase() === ".xml");

    arquivosXML.forEach(arquivo => {
        const caminhoArquivo = path.join(pasta, arquivo);

        fs.readFile(caminhoArquivo, "utf8", (err, conteudo) => {
            if(err) {
                console.error("Erro ao ler o arquivo:", caminhoArquivo, err);
                return;
            }

            xml2js.parseString(conteudo, (err, result) => {
                if(err) {
                    console.error("Erro ao analisar o XML:", caminhoArquivo, err);
                    return;
                }
                console.log(result)
                if(result.nfeProc) {
                    const novoCaminhoArquivo = path.join(novaPastaAutorizados, arquivo);

                    fs.rename(caminhoArquivo, novoCaminhoArquivo, err => {
                        if(err) {
                            console.error("Erro ao mover o arquivo:", caminhoArquivo, err)
                            return;
                        }
                    })
                    console.log("Arquivo NFEPROC:", caminhoArquivo);
                    
                } else {
                    console.log ("Arquivo", caminhoArquivo, "não é autorizado");

                    const novoCaminhoArquivo = path.join(novaPastaNaoAutorizados, arquivo);

                    fs.rename(caminhoArquivo, novoCaminhoArquivo, err => {
                        if (err) {
                            console.error("Erro ao mover o arquivo:", caminhoArquivo, err)
                            return;
                        }
                        console.log("Arquivo movido para", novoCaminhoArquivo)
                    })
                }

            })
        })
    })
})


