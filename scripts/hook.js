
const { modifyConfigAsync } = require('@expo/config');

// Esta função será executada após a publicação do aplicativo
const setUsesCleartextTraffic = async () => {
    try {
        // Obtém a configuração do projeto
        const { exp } = await modifyConfigAsync({
            // Pode ser 'app.json' ou 'app.config.js', dependendo do seu projeto
            // Certifique-se de especificar o caminho correto aqui
            // Use o mesmo caminho que você usou no arquivo app.json
            configPath: 'caminho_para_seu_app_json/app.json',
        });

        // Define 'usesCleartextTraffic' para true no Android
        if (exp && exp.android) {
            exp.android.usesCleartextTraffic = true;
        }

        // Salva as alterações
        await modifyConfigAsync({
            // Use o mesmo caminho que você usou no primeiro 'modifyConfigAsync'
            configPath: '../app.json',
            config: exp,
        });

        console.log('Configuração "usesCleartextTraffic" configurada com sucesso para Android.');
    } catch (error) {
        console.error('Erro ao configurar "usesCleartextTraffic" para Android:', error);
    }
};

// Chama a função para configurar 'usesCleartextTraffic'
setUsesCleartextTraffic();
