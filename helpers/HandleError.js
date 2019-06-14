var errors = require('restify-errors');

function notFoundError(response,id,rotulo,message){    
    return response.status(404).json(new errors.NotFoundError(`Elemento com ${rotulo || 'Identificador'} ${id} ${message || 'Não encontrado'}`)    );
}

module.exports = {notFoundError}